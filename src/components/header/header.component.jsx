import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends React.Component {

    constructor(props) {

        super(props);

    }

    render() {

        const currentUser = this.props.currentUser;
        const hidden = this.props.hidden;

        return (

                <Navbar bg="light" expand="lg" sticky="top">
                    <LinkContainer className='logo-container' to='/'>
                        <Navbar.Brand>FIND A LENS</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer className='option' to='/contact'>
                                <Nav.Link>CONTACT</Nav.Link>
                            </LinkContainer>
                            <LinkContainer className='option' to='/profile' >
                                <Nav.Link>PROFILE</Nav.Link>
                            </LinkContainer>
                            {currentUser ? (
                                <div className='option' onClick={() => auth.signOut()} > Sign Out
                                </div>)
                                : (
                                    <LinkContainer className='option' to='/signin'>
                                        <Nav.Link>SIGN IN</Nav.Link>
                                    </LinkContainer>
                                )}
                            <CartIcon />
                            {
                                hidden ? null : <CartDropdown />
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);