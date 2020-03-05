import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector} from "reselect";

import {auth} from '../../firebase/firebase.util';

import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from '../../redux/user/user.selector'
import {selectIsHidden} from '../../redux/cart/cart.selectors'

const Header = ({ currentUser, isCartHidden }) => (
    <div className='header'>
        <Link to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/shop'>CONTACT</Link>
            {
                currentUser ?
                <div className='option' onClick={ () => auth.signOut()}>SIGN OUT</div>
                : 
                <Link className='option' to='/signIn'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {isCartHidden ? null : <CartDropdown/>}
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isCartHidden: selectIsHidden
});

export default connect(mapStateToProps)(Header);
