import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Header from './components/header/header.component';
import SignInandSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

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


  render() {
    return (
      <div>
        <Header  />
        <Switch>
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
        </Switch>
      </div>
      );
    }
  }

const mapStatetoProps = ({ user }) => ({
  currentUser: user.currentUser
})
  
const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
});

export default connect(
  mapStatetoProps, 
  mapDispatchtoProps)
  (App);
