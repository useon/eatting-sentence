import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAkozRar5gk4wtuFxIwlxlPNkXqMunV9fs",
  authDomain: "sentence-collection-note.firebaseapp.com",
  projectId: "sentence-collection-note",
  storageBucket: "sentence-collection-note.appspot.com",
  messagingSenderId: "988105689872",
  appId: "1:988105689872:web:b1721bcb751f1e2772b395"
};

firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();