import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBj17MZYmFp6tHomu73OTZkAMYuDrMv2Pg",
    authDomain: "uniconnect-b303d.firebaseapp.com",
    projectId: "uniconnect-b303d",
    storageBucket: "uniconnect-b303d.firebasestorage.app",
    messagingSenderId: "261107243424",
    appId: "1:261107243424:web:fcec65149d7f48fd202cc5",
    measurementId: "G-FS1HCTMVW6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
// Initialize analytics only on client side
if (typeof window !== 'undefined') {
    isSupported().then((yes) => {
        if (yes) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, analytics, storage };
