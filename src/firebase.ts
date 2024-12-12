// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgLHfg92ImmArAmMrkxnm3yLyV-n0XQsU",
  authDomain: "blog-app-d76b7.firebaseapp.com",
  projectId: "blog-app-d76b7",
  storageBucket: "blog-app-d76b7.firebasestorage.app",
  messagingSenderId: "822099786388",
  appId: "1:822099786388:web:8d7c038de7f8bdde9d1281",
  measurementId: "G-6Y5Q0SXMKS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
