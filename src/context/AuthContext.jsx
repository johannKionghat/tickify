import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign up function
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Login function
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout function
    function logout() {
        return signOut(auth);
    }

    // Google sign in
    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    // Reset password
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // Update email
    function updateEmail(email) {
        return user.updateEmail(email);
    }

    // Update password
    function updatePassword(password) {
        return user.updatePassword(password);
    }

    async function updateUserProfile(profileData) {
        await updateProfile(auth.currentUser, profileData);
        // Update the local user state to reflect changes
        setUser({ ...auth.currentUser });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        loading,
        signup,
        login,
        logout,
        signInWithGoogle,
        resetPassword,
        updateEmail,
        updatePassword,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
