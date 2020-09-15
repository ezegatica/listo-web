import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyAcPMH0qYuAqvTCJaq9LSLZECh0V9cApV0",
    authDomain: "prueba-proyecto-tic.firebaseapp.com",
    databaseURL: "https://prueba-proyecto-tic.firebaseio.com",
    projectId: "prueba-proyecto-tic",
    storageBucket: "prueba-proyecto-tic.appspot.com",
    messagingSenderId: "68477335290",
    appId: "1:68477335290:web:fb7914e85889cc30293b43"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.firestore()
  
  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()

export {firebase as default, auth, db, storage}