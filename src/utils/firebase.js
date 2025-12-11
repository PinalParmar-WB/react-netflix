// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBST3MQSqL6sexsXFOhN58nfggAUFNRBow",
  authDomain: "netflix-clone-2ef00.firebaseapp.com",
  projectId: "netflix-clone-2ef00",
  storageBucket: "netflix-clone-2ef00.firebasestorage.app",
  messagingSenderId: "100166147872",
  appId: "1:100166147872:web:e6c8dfb4139f80195e8145",
  measurementId: "G-QKV31708RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Auth correctly
export const auth = getAuth(app);

// Export app in case needed
export default app;
