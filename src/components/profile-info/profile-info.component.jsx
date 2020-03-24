import React from 'react';


import firebase from 'firebase';
import 'firebase/firestore';


import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom button/custom-button.component';

import './profile-info.styles.scss';

class ProfileInfo extends React.Component {
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
            zip: ''        
    };
        
    }
    handleSubmit = async event => {
        event.preventDefault();
        const db = firebase.firestore();
        const userRef = db.collection('user-example').add({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            address_line_1: this.state.address_line_1,
            address_line_2: this.state.address_line_2,
            city: this.state.city,
            state_province: this.state.state_province,
            zip: this.state.zip
        });
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            state_province: '',
            zip: '' 
            }); 
    };
    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };
    render(){

        return(
            <div className='update-info'>
                <h2 className='title'>Update Your Profile Information</h2>
                <span>Remember to Save Your Changes!</span>

                <form className='profile-info' onSubmit={this.handleSubmit} >
                <FormInput
                        type='text'
                        name='first_name'
                        value= {this.state.first_name}
                        onChange= {this.handleChange}
                        label='First Name'
                        required
                    />
                <FormInput
                        type='text'
                        name='last_name'
                        value= {this.state.last_name}
                        onChange= {this.handleChange}
                        label='Last Name'
                        required
                />
                <FormInput
                        type='email'
                        name='email'
                        value= {this.state.email}
                        onChange= {this.handleChange}
                        label='Email'
                        required
                    />
                <FormInput
                        type='text'
                        name='phone'
                        value= {this.state.phone}
                        onChange= {this.handleChange}
                        label='Phone'
                        required
                    />
                <FormInput
                        type='text'
                        name='address_line_1'
                        value= {this.state.address_line_1}
                        onChange= {this.handleChange}
                        label='Street Address'
                        required
                    />
                <FormInput
                        type='text'
                        name='address_line_2'
                        value= {this.state.address_line_2}
                        onChange= {this.handleChange}
                        label='Apt Suite'
                    />
                <FormInput
                        type='text'
                        name='city'
                        value= {this.state.city}
                        onChange= {this.handleChange}
                        label='City'
                        required
                    />
                <FormInput
                        type='text'
                        name='state_province'
                        value= {this.state.state_province}
                        onChange= {this.handleChange}
                        label='State / Province'
                        required
                    />
                <FormInput
                        type='text'
                        name='zip'
                        value= {this.state.zip}
                        onChange= {this.handleChange}
                        label='Zip Code'
                        required
                    />
                <div className='buttons'>
                <CustomButton type="submit"> Save Changes </CustomButton>
                    
                </div>
                </form>
            </div>
        )
    }
}

export default ProfileInfo;