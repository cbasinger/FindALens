import Firebase from '../../firebase/firebase.utils';
import React from 'react';
import Map from '../../components/map.component';

const firebase = new Firebase();

function handleClick(e) {
    e.preventDefault();
    firebase.db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
}


export default class HomePage extends React.Component {

    render() {

        return <div>
                    <button onClick={handleClick}>Click me</button>
                    <Map />
               </div>

    }
}