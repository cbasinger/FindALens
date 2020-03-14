//require('dotenv').config();
const firebase = require("firebase");
require("firebase/firestore");


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

class Firebase {

    constructor() {

        firebase.initializeApp(config);
        this.db = firebase.firestore();

    }

}

export default Firebase;
