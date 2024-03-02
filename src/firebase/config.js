import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBJo8Dv9Xs81nw7z6vMN2V-kCFIHIFm1RA',
  authDomain: 'scheduler-5dd12.firebaseapp.com',
  projectId: 'scheduler-5dd12',
  storageBucket: 'scheduler-5dd12.appspot.com',
  messagingSenderId: '755939209208',
  appId: '1:755939209208:web:a7b915ee0a91867a7b700d',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
