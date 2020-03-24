import React from 'react';


import firebase from 'firebase';
import 'firebase/firestore';

import './viewprofile.styles.scss';


class ViewProfile extends React.Component {
    constructor(){
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            state_province: '',
            zip: '',
            is_photographer: ''       
    };
}
render() {
    const db = firebase.firestore();
    const userRef = db.collection('users').uid;
    return (
        <div className='profile-view'>
            <h2>{this.state.first_name}'s Information</h2>
        </div>
    );
}
}

export default ViewProfile;