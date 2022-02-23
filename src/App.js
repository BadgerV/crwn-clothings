import './App.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux'

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component'
import Header from './component/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import {auth, CreateUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component{


unSubscribeFromAuth = null;

componentDidMount() {
  const {setCurrentUser} = this.props;
  this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth) {
      const userRef = await CreateUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id : snapShot.id,
            ...snapShot.data()
          })
      })
    }
      setCurrentUser(userAuth)
  })

  
}

componentWillUnmount() {
  this.unSubscribeFromAuth()
}

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path = '/' component={HomePage} />
          <Route  path = '/shop' component={ShopPage} />
          <Route  path = '/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
