
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDPP7npxt4N9wzWsA0_GXq4PNs3k1VK9lE",
    authDomain: "sportcenter-369ba.firebaseapp.com",
    databaseURL: "https://sportcenter-369ba.firebaseio.com",
    projectId: "sportcenter-369ba",
    storageBucket: "sportcenter-369ba.appspot.com",
    messagingSenderId: "1003985187188",
    appId: "1:1003985187188:web:b01a445626adb199753c21"
  };


 firebase.initializeApp(firebaseConfig);
 export const storage = firebase.storage()
 export const database = firebase.database()
 export const auth =  firebase.auth()
 firebase.firestore();
  export default firebase;