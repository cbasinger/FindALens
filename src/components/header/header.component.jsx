import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import './header.styles.scss';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';



class Header extends React.Component {

    constructor(props) {

        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {

        const currentUser = this.props.currentUser;
        const hidden = this.props.hidden;

        return (
            <div className='header'>
                <Navbar color="inverse" light expand="md">
                    <Link className='logo-container' to='/'>
                        <NavbarBrand href="/">FIND A LENS</NavbarBrand>
                    </Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <div className='options'>
                                <Link className='option' to='/contact'>
                                    <NavItem>
                                        CONTACT
                                    </NavItem>
                                </Link>
                                <Link className='option' to='/profile' >
                                    <NavItem>
                                        PROFILE
                            </NavItem>
                                </Link>
                                {currentUser ? (
                                    <div className='option' onClick={() => auth.signOut()} > Sign Out
                                    </div>)
                                    : (
                                        <Link className='option' to='/signin'>
                                            <NavItem>
                                                SIGN IN
                                            </NavItem>
                                        </Link>
                                    )}
                                <CartIcon />
                            </div>
                            {
                                hidden ? null : <CartDropdown />
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);