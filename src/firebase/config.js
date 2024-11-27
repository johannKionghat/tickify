import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtzqUAbtqM1pnNzSmUrgHm3-H9fb1Jnmw",
  authDomain: "tickitask.firebaseapp.com",
  projectId: "tickitask",
  storageBucket: "tickitask.firebasestorage.app",
  messagingSenderId: "754264519896",
  appId: "1:754264519896:web:2c02ba354f8ac7574ad3ad",
  measurementId: "G-0V0NWTKCXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
