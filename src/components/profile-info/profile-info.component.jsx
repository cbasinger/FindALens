import React from 'react';
import { Redirect } from 'react-router-dom';


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
        const {first_name, last_name, email, phone, address_line_1, address_line_2,city,state_province,zip} = this.state;
            try {
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
            })
        } catch (error) {
            console.log(error);
        }
    };
    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }
    render(){
        const {first_name, last_name, email, phone, address_line_1, address_line_2,city,state_province,zip} = this.state;

        return(
            <div className='update-info'>
                <h2 className='title'>Update Your Profile Information</h2>
                <span>Remember to Save Your Changes!</span>

                <form className='profile-info' onSubmit={this.handleSubmit} >
                <FormInput
                        type='text'
                        name='firstname'
                        value= {first_name}
                        onChange= {this.handleChange}
                        label='First Name'
                        required
                    />
                <FormInput
                        type='text'
                        name='lastname'
                        value= {last_name}
                        onChange= {this.handleChange}
                        label='Last Name'
                        required
                />
                <FormInput
                        type='email'
                        name='email'
                        value= {email}
                        onChange= {this.handleChange}
                        label='Email'
                        required
                    />
                <FormInput
                        type='text'
                        name='phone'
                        value= {phone}
                        onChange= {this.handleChange}
                        label='Phone'
                        required
                    />
                <FormInput
                        type='text'
                        name='address_line_1'
                        value= {address_line_1}
                        onChange= {this.handleChange}
                        label='Street Address'
                        required
                    />
                <FormInput
                        type='text'
                        name='address_line_2'
                        value= {address_line_2}
                        onChange= {this.handleChange}
                        label='Apt Suite'
                    />
                <FormInput
                        type='text'
                        name='city'
                        value= {city}
                        onChange= {this.handleChange}
                        label='City'
                        required
                    />
                <FormInput
                        type='text'
                        name='state_province'
                        value= {state_province}
                        onChange= {this.handleChange}
                        label='State / Province'
                        required
                    />
                <FormInput
                        type='text'
                        name='zip'
                        value= {zip}
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