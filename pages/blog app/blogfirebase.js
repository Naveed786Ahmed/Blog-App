import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDqeJ1qLsCD3yhzAWaTYo5zZaRsYTgn5_4",
    authDomain: "my-first-firebase-projec-dc505.firebaseapp.com",
    projectId: "my-first-firebase-projec-dc505",
    storageBucket: "my-first-firebase-projec-dc505.appspot.com",
    messagingSenderId: "966135941411",
    appId: "1:966135941411:web:da9b3d32ea8f8645cba496"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    provider,
    signInWithPopup,
    signOut,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    collection,
    addDoc,
    db, 
    getDocs,
    doc, 
    deleteDoc,
    getDoc
}










