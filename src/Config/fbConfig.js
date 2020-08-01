import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyBnuAahCVSPbOE-q9OOwgObPIMMSPE-YYY",
    authDomain: "gati-planner.firebaseapp.com",
    databaseURL: "https://gati-planner.firebaseio.com",
    projectId: "gati-planner",
    storageBucket: "gati-planner.appspot.com",
    messagingSenderId: "104060325210",
    // appId: "1:104060325210:web:fe06310e486fa7a21df763",
    // measurementId: "G-2T5JLBTRMB"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.firestore()

  export default firebase;