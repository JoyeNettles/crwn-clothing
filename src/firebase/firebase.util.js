import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAERbksSv9jItrij2kLtGfaiVmGd74eFVY",
    authDomain: "crwn-db-af7aa.firebaseapp.com",
    databaseURL: "https://crwn-db-af7aa.firebaseio.com",
    projectId: "crwn-db-af7aa",
    storageBucket: "crwn-db-af7aa.appspot.com",
    messagingSenderId: "469250085445",
    appId: "1:469250085445:web:7bea72ce5ed9138c70492c"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters( {prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;