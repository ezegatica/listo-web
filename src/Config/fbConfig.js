import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
// Your web app's Firebase configuration
var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIRESTORE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.firestore()
  
  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()
  const fb = firebase
export {firebase as default, auth, db, storage, fb}