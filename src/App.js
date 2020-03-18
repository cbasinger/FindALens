import React from 'react';



import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

import Header from './components/header/header.component';
import SignInandSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }
unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser : {
              id: snapShot.id,
              ...snapShot.data()
            } 
          });
        });
      }    
      this.setState({currentUser: userAuth});  
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route path='/signin' component={SignInandSignUpPage} />
        </Switch>
      </div>
      );
    }
  }
  


export default App;
