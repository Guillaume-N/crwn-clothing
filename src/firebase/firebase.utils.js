import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDT1hjCGGcpTOTNZDDdWdqUCiBTQZ0OMOQ",
  authDomain: "crwn-db-da588.firebaseapp.com",
  databaseURL: "https://crwn-db-da588.firebaseio.com",
  projectId: "crwn-db-da588",
  storageBucket: "crwn-db-da588.appspot.com",
  messagingSenderId: "681508612635",
  appId: "1:681508612635:web:c8ee4b460e42248bef66be",
  measurementId: "G-918GC1N11W"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  console.log(snapShot);

  if (snapShot.exists === false) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
