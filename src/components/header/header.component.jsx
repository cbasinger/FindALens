import React from 'react';
import { connect } from 'react-redux';


import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';


const Header = ({ currentUser }) => (
    <div className='header'>
        <Link className= 'logo-container' to='/'>
        FIND A LENS
        </Link>
        <div className='options'>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            
                {currentUser ? (
                    <div className='option' onClick={() => auth.signOut()} > Sign Out
                    </div>) 
                    : (
                    <Link className='option' to='/signin'> SIGN IN </Link>
                    )}
            
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);