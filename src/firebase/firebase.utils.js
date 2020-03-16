import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =
{
    apiKey: "AIzaSyAMF5NIm4U21YwTNPsmi5_r92ABs-GvhMk",
    authDomain: "find-a-lens.firebaseapp.com",
    databaseURL: "https://find-a-lens.firebaseio.com",
    projectId: "find-a-lens",
    storageBucket: "find-a-lens.appspot.com",
    messagingSenderId: "891092983053",
    appId: "1:891092983053:web:25815b67392246c0172444",
    measurementId: "G-1ZMZCN2DT2"
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
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }

    }
    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;