
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';

import Header from './components/header/header.component';
import ContactPage from './pages/contact/contact.component';
import ProfilePage from './pages/profile/profilepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ViewProfile from './components/view-profile/viewprofile.component';
import SignInandSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument, createProfileInfoDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';


class App extends React.Component {
unsubscribeFromAuth = null

componentDidMount(){
const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
          setCurrentUser( {
              id: snapShot.id,
              ...snapShot.data()
            }); 
          });
      }    
      setCurrentUser(userAuth);  
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  handleChange(){

  }

  render() {
    return (
      <div>
        <Header  />
        <Switch>
          
          <Route path='/user/:id' />
          <Route path='/contact' component={ContactPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route 
          exact path='/signin'
          render={() => 
            this.props.currentUser ? (
            <Redirect to = '/' />
            ) : (
            <SignInandSignUpPage/>
            )
        } 
        />
        <Route path='/' component={HomePage} /> 
        </Switch>
      </div>
      );
    }
  }

const mapStatetoProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})
  
const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
});

export default connect(
  mapStatetoProps, 
  mapDispatchtoProps)
  (App);
