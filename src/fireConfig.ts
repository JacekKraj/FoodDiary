import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'fooddiary-ee0a0.firebaseapp.com',
  projectId: 'fooddiary-ee0a0',
  storageBucket: 'fooddiary-ee0a0.appspot.com',
  messagingSenderId: '586406500069',
  appId: '1:586406500069:web:c3b229ee4747c57340260c',
  measurementId: 'G-N42YZT7NHK',
};
// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);
