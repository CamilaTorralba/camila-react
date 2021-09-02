import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
  
    apiKey: "AIzaSyBurLhPzkQPVejGQ2Eo-PTG_iWsQx8Rrj4",
  authDomain: "camila-proyecto-react.firebaseapp.com",
  projectId: "camila-proyecto-react",
  storageBucket: "camila-proyecto-react.appspot.com",
  messagingSenderId: "253872889471",
  appId: "1:253872889471:web:ee9a80f6a48df74f83a94a"
  });

export function getFirebase() {
    return app;
}
export function getFirestore() {
    return firebase.firestore(app);
}



