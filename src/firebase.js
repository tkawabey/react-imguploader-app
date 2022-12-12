// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7V3V6ypadMowU5gOo4E7kBNcgPtDPVHE",
  authDomain: "my-img-uploder.firebaseapp.com",
  projectId: "my-img-uploder",
  storageBucket: "my-img-uploder.appspot.com",
  messagingSenderId: "612394054900",
  appId: "1:612394054900:web:cd987cc2ede82fe02e9aa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a root reference
const storage = getStorage(app);


export default storage;

