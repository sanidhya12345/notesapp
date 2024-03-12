import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC-YQR54kmN450qYldz2dn-IMuwsmMO9T4",
    authDomain: "signinsignup-19fb4.firebaseapp.com",
    projectId: "signinsignup-19fb4",
    storageBucket: "signinsignup-19fb4.appspot.com",
    messagingSenderId: "108159017127",
    appId: "1:108159017127:web:a0a5de4f5f31ad56023b82"
  };

  firebase.initializeApp(firebaseConfig);
  const firestore=firebase.firestore();
  export {firestore};