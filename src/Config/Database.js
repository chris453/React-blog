import firebase from "firebase/app"
require('firebase/database');
require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCwyfXPSlFZtCo2JhXEFt2dItyO-TnLXvc",
  authDomain: "sturdy-plateau-174315.firebaseapp.com",
  databaseURL: "https://sturdy-plateau-174315.firebaseio.com",
  projectId: "sturdy-plateau-174315",
  storageBucket: "sturdy-plateau-174315.appspot.com",
  messagingSenderId: "370550440189",
  appId: "1:370550440189:web:76daa12fd7b85fd7"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
