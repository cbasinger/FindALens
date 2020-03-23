import { firestore } from '../../firebase/firebase.utils';
import React from 'react';
import Map from '../../components/map/map.component';

/* function handleClick(e) {
    e.preventDefault();
    firestore.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
} */


export default class HomePage extends React.Component {

    render() {

        return <div>
                    <Map />
               </div>
               
    }
}
