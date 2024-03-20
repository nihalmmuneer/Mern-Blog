// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_API_TOKEN, "api-token");
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_TOKEN,
  authDomain: "mern-blog-405e4.firebaseapp.com",
  projectId: "mern-blog-405e4",
  storageBucket: "mern-blog-405e4.appspot.com",
  messagingSenderId: "1063177472314",
  appId: "1:1063177472314:web:87a616c83ccfbc97456803",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
