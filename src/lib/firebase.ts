// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZPrrGeVWVsDItIel5Tk43hrXfW_tpWvI",
  authDomain: "uxdsrini-74fa5.firebaseapp.com",
  projectId: "uxdsrini-74fa5",
  storageBucket: "uxdsrini-74fa5.firebasestorage.app",
  messagingSenderId: "258587413449",
  appId: "1:258587413449:web:b262c9b9564bf7451af618",
  databaseURL: "https://uxdsrini-74fa5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Realtime Database and Auth
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence);