// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCv2yVgSmZ09vJtvqdy4wgDtE5EuVNFvk",
  authDomain: "iths-crossplatform-1f3f0.firebaseapp.com",
  projectId: "iths-crossplatform-1f3f0",
  storageBucket: "iths-crossplatform-1f3f0.appspot.com",
  messagingSenderId: "519372396524",
  appId: "1:519372396524:web:4318052d07e411ca8012c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
