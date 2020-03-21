import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
           {/*  {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
            ))} */}
            <span className='empty-message'>Your cart is empty</span>
        </div>        
        <CustomButton>Go to Checkout</CustomButton>
    </div>
);

const mapStatetoProps = ({ cart: {cartItems} }) => ({
    cartItems
});

export default connect(mapStatetoProps)(CartDropdown);