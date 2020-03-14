import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';

import './sign-in-sign-up.styles.scss';

//use function component because we will keep class components 
//under the Sign-IN and Sign-Up components
const SignInandSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        
    </div>
);

export default SignInandSignUpPage;