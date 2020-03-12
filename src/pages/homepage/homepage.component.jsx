import Firebase from '../../firebase/firebase.utils';
import React from 'react';

const firebase = new Firebase();


function handleClick(e) {
    e.preventDefault();
    firebase.db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().f_name}, ${doc.data().l_name}`);
        });
    });
}


const HomePage = () => (

    <div>

        <button onClick={handleClick}>Click me</button>

    </div>

);

export default HomePage;