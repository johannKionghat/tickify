import { db, auth } from './config';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';

// Convert Firestore timestamp to readable format
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// User Profile Functions
export const createUserProfile = async (userData) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated. Please sign in.');
    }

    await setDoc(doc(db, 'users', userId), {
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || '',
      email: auth.currentUser.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated. Please sign in.');
    }

    await updateDoc(doc(db, 'users', userId), {
      ...userData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated. Please sign in.');
    }

    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();
    return {
      ...userData,
      createdAt: formatTimestamp(userData.createdAt),
      updatedAt: formatTimestamp(userData.updatedAt)
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Get all checklists for current user
export const getChecklists = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated. Please sign in.');
    }

    const q = query(collection(db, 'checklists'), where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const checklists = [];
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const checklist = {
        id: doc.id,
        ...data,
        created_at: formatTimestamp(data.created_at)
      };
      // Get todos for this checklist
      const todosSnapshot = await getDocs(collection(db, `checklists/${doc.id}/todo`));
      checklist.todo = todosSnapshot.docs.map(todoDoc => ({
        id: todoDoc.id,
        ...todoDoc.data()
      }));
      checklists.push(checklist);
    }
    
    return checklists;
  } catch (error) {
    console.error('Error getting checklists:', error);
    throw error;
  }
};

// Create new checklist
export const createChecklist = async (title, description, tasks = []) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated. Please sign in.');
    }

    // Create main checklist document
    const checklistRef = await addDoc(collection(db, 'checklists'), {
      title,
      description,
      user_id: userId,
      statut: 0,
      created_at: serverTimestamp()
    });

    // Add tasks to todo subcollection
    if (tasks.length > 0) {
      const batch = writeBatch(db);
      tasks.forEach(task => {
        const todoRef = doc(collection(db, `checklists/${checklistRef.id}/todo`));
        batch.set(todoRef, {
          title: task.title,
          statut: 0
        });
      });
      await batch.commit();
    }

    return checklistRef.id;
  } catch (error) {
    console.error('Error creating checklist:', error);
    throw error;
  }
};

// Update checklist
export const updateChecklist = async (checklistId, title, description, tasks) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated. Please sign in.');
    }

    // Verify ownership
    const checklistDoc = await getDoc(doc(db, 'checklists', checklistId));
    if (!checklistDoc.exists() || checklistDoc.data().user_id !== userId) {
      throw new Error('Unauthorized to update this checklist');
    }

    // Update main checklist document
    const checklistRef = doc(db, 'checklists', checklistId);
    await updateDoc(checklistRef, {
      title,
      description
    });

    // Get existing todos
    const todosSnapshot = await getDocs(collection(db, `checklists/${checklistId}/todo`));
    const batch = writeBatch(db);
    
    // Delete existing todos
    todosSnapshot.docs.forEach(todoDoc => {
      batch.delete(todoDoc.ref);
    });

    // Add new todos
    tasks.forEach(task => {
      const todoRef = doc(collection(db, `checklists/${checklistId}/todo`));
      batch.set(todoRef, {
        title: task.title,
        statut: task.statut || 0
      });
    });

    await batch.commit();
  } catch (error) {
    console.error('Error updating checklist:', error);
    throw error;
  }
};

// Delete checklist
export const deleteChecklist = async (checklistId) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated. Please sign in.');
    }

    // Verify ownership
    const checklistDoc = await getDoc(doc(db, 'checklists', checklistId));
    if (!checklistDoc.exists() || checklistDoc.data().user_id !== userId) {
      throw new Error('Unauthorized to delete this checklist');
    }

    // Delete all todos in the subcollection first
    const todosSnapshot = await getDocs(collection(db, `checklists/${checklistId}/todo`));
    const batch = writeBatch(db);
    todosSnapshot.docs.forEach(todoDoc => {
      batch.delete(todoDoc.ref);
    });
    await batch.commit();

    // Delete the main checklist document
    await deleteDoc(doc(db, 'checklists', checklistId));
  } catch (error) {
    console.error('Error deleting checklist:', error);
    throw error;
  }
};

// Update task status
export const updateTaskStatus = async (checklistId, taskId, newStatus) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated. Please sign in.');
    }

    // Verify ownership of parent checklist
    const checklistDoc = await getDoc(doc(db, 'checklists', checklistId));
    if (!checklistDoc.exists() || checklistDoc.data().user_id !== userId) {
      throw new Error('Unauthorized to update this task');
    }

    // Check if task exists before updating
    const taskRef = doc(db, `checklists/${checklistId}/todo/${taskId}`);
    const taskDoc = await getDoc(taskRef);
    
    if (!taskDoc.exists()) {
      throw new Error('Task not found');
    }

    await updateDoc(taskRef, {
      statut: newStatus
    });
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};
