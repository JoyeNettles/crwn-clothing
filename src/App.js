import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth, createUserProfileDocument} from './firebase/firebase.util';
import {selectCurrentUser} from "./redux/user/user.selector";
import {createStructuredSelector} from "reselect";

import './App.css';
import {setCurrentUser} from './redux/user/user.action';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop-page/shop-page.component';
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

export class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUserInState} = this.props;

        // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        //     if (userAuth) {
        //         const userRef = await createUserProfileDocument(userAuth);
        //         userRef.onSnapshot(snapshot => {
        //             setCurrentUserInState({
        //                 id: snapshot.id,
        //                 ...snapshot.data()
        //             });
        //         })
        //     }
        //
        //     setCurrentUserInState(userAuth);
        // })
    }

    componentWillUnmount() {
        // this.unsubscribeFromAuth();
    }

    render() {
        const {currentUser} = this.props;
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
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUserInState: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
