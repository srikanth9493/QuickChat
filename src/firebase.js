import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCiyR7XNRoJv36nkeNfI0GKN6QyABKYYsk",
  authDomain: "quick-chat-5316d.firebaseapp.com",
  projectId: "quick-chat-5316d",
  storageBucket: "quick-chat-5316d.appspot.com",
  messagingSenderId: "441952205142",
  appId: "1:441952205142:web:15dd8013bd7a83d49c3ef7",
  measurementId: "G-FB3DTLBENZ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
