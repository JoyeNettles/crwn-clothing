import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from '../../redux/user/user.selector'
import {selectIsHidden} from '../../redux/cart/cart.selectors'
import {HeaderContainer, LogoContainer, OptionButton, OptionLink, OptionsContainer} from "./header.styles";
import {signOutStart} from "../../redux/user/user.action";

const Header = ({ currentUser, isCartHidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/shop'>CONTACT</OptionLink>
            {
                currentUser ?
                    <OptionButton onClick={signOutStart}>SIGN OUT</OptionButton>
                    :
                    <OptionLink to='/signIn'>SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {isCartHidden ? null : <CartDropdown/>}


    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isCartHidden: selectIsHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
