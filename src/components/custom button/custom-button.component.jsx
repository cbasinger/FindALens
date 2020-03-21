import React from 'react';

import Button from '@material-ui/core/Button';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <Button
        className={`
        ${inverted ? 'inverted' : ''}
        ${isGoogleSignIn ? 'google-sign-in' : ''} 
        custom-button`}
        {...otherProps}
    >
        {children}
    </Button>
)

export default CustomButton;