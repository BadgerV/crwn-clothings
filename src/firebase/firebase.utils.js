import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyBJQ12Ah8eyd1QDgiAn3GlN3TQU0ZiwF4U",
    authDomain: "crwn-db-e270e.firebaseapp.com",
    projectId: "crwn-db-e270e",
    storageBucket: "crwn-db-e270e.appspot.com",
    messagingSenderId: "737548788485",
    appId: "1:737548788485:web:ebe60cc51eba91c0090d6c",
    measurementId: "G-G65BW3R80M"
  };

  export const CreateUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
        }catch(err) {
          console.log('error creating user', err.message)
        }
    }

    return userRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    })

    return await batch.commit();
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({propmt : 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;