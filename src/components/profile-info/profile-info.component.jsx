import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Geocode from 'react-geocode';

import { createProfileInfo } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom button/custom-button.component';
import { Checkbox } from '@material-ui/core';

import './profile-info.styles.scss';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(`AIzaSyDMGisNx0DgItQ35EGeuTKh4M3Cj4QGbc4`);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("us");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

class ProfileInfo extends React.Component {
    constructor() {
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
            is_photographer: true
        };

        this.convertToGeocode = this.convertToGeocode.bind(this);

    }

    handleSubmit = async event => {
        
        event.preventDefault();

        createProfileInfo();
        this.convertToGeocode();
        
        /* const userRef = firebase.database().ref('users');


        
        const usersRef = () => {firebase.firestore().collection('users')};
        const snapShot = await usersRef.get;

/*         const {first_name, last_name, email, phone, address_line_1, address_line_2, city, state_province, zip, is_photographer} = this.state;
 */        
        const addInfo = () => {
                usersRef.push() ({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                phone: this.state.phone,
                address_line_1: this.state.address_line_1,
                address_line_2: this.state.address_line_2,
                city: this.state.city,
                state_province: this.state.state_province,
                zip: this.state.zip,
                is_photographer: true
        });
        
        console.log(addInfo);
    }
            
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            state_province: '',
            zip: '',
            is_photographer: true
        });
    };

    handleChange = event => {

        const { value, name } = event.target;
        this.setState({ [name]: value });

    };

    convertToGeocode = () => {

        Geocode.fromAddress(`${this.state.address_line_1}, ${this.state.city}, ${this.state.state_province}, ${this.state.zip}`).then(
            response => {
                const lat = response.results[0].geometry.location.lat;
                const lng = response.results[0].geometry.location.lng;
                console.log(lat, lng);
            }
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        });

    }

    render() {

        return (
            <div className='update-info'>
                <h2 className='title'>Update Your Profile Information</h2>
                <span>Remember to Save Your Changes!</span>

                <form className='profile-info' onSubmit={this.handleSubmit} >
                    <FormInput
                        type='text'
                        name='first_name'
                        value={this.state.first_name}
                        onChange={this.handleChange}
                        label='First Name'
                        required
                    />
                    <FormInput
                        type='text'
                        name='last_name'
                        value={this.state.last_name}
                        onChange={this.handleChange}
                        label='Last Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='text'
                        name='phone'
                        value={this.state.phone}
                        onChange={this.handleChange}
                        label='Phone'
                        
                    />
                    <FormInput
                        type='text'
                        name='address_line_1'
                        value={this.state.address_line_1}
                        onChange={this.handleChange}
                        label='Street Address'
                        required
                    />
                    <FormInput
                        type='text'
                        name='address_line_2'
                        value={this.state.address_line_2}
                        onChange={this.handleChange}
                        label='Apt Suite'
                    />
                    <FormInput
                        type='text'
                        name='city'
                        value={this.state.city}
                        onChange={this.handleChange}
                        label='City'
                        required
                    />
                    <FormInput
                        type='text'
                        name='state_province'
                        value={this.state.state_province}
                        onChange={this.handleChange}
                        label='State / Province'
                        required
                    />
                    <FormInput
                        type='text'
                        name='zip'
                        value={this.state.zip}
                        onChange={this.handleChange}
                        label='Zip Code'
                        required
                    />
                    <h5>Are you a photographer?</h5>
                    <Checkbox
                        checked={this.checked}
                        onChange={this.handleChange}>

                    </Checkbox>
                    <div className='buttons'>
                        <CustomButton type="submit"> Save Changes </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProfileInfo;