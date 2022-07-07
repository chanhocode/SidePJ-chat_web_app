// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "chat-web-app-f0c1f.appspot.com",
  messagingSenderId: "845227645879",
  appId: "1:845227645879:web:3daa7dd05ec856e78f6632",
  measurementId: "G-2JBMK94D1L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
