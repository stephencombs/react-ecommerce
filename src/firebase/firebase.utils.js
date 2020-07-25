import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBO2EcJV_ohHmDfKBrk-uvQBeDYfadlwS8",
  authDomain: "react-ecommerce-cc702.firebaseapp.com",
  databaseURL: "https://react-ecommerce-cc702.firebaseio.com",
  projectId: "react-ecommerce-cc702",
  storageBucket: "react-ecommerce-cc702.appspot.com",
  messagingSenderId: "960845106112",
  appId: "1:960845106112:web:86b786d7067e31667f1625",
  measurementId: "G-C7RN1YR034",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
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
