import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectCurrentUser} from "./redux/user/user.selector";
import {createStructuredSelector} from "reselect";

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop-page/shop-page.component';
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {checkUserSession} from "./redux/user/user.action";

const App = ({checkUserSession, currentUser}) => {

    useEffect(() => {
        checkUserSession()
    }, [checkUserSession]);

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
                <Route exact
                       path='/signIn'
                       render={() =>
                           currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/>

            </Switch>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
