import React, { useState} from 'react'; 
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, withRouter, useHistory} from 'react-router-dom';
import {Provider} from 'react-redux';

import { createStore, applyMiddleware, compose } from "redux";

import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import Header from './components/layout/Header';
import Dashboard from './components/layout/Dashboard';

import { ConnectedRouter, push } from "connected-react-router";
import { ToastContainer, toast } from 'react-toastify';

import store from './store';

const LoginAuth1 = (onAuth, isAuthenticated) => {
  return (
    <Login onAuth={onAuth} isAuthenticated={isAuthenticated}/>
  )
}

function App() {
  let history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onAuth = (response) => {
    if (response && 'login' in response && response.login) {
      toast.success('Signed Up Successfully')
      setIsAuthenticated(true);
      setFirstName(response.firstName);
      setLastName(response.lastName);
      history.push('/dashboard');
    }
  }

  const onLogout = (history) => {
    setIsAuthenticated('');
    history.push('/');
  }

  const SignupAuth = () => {
    return (
      <SignUp onAuth={onAuth} isAuthenticated={isAuthenticated} />
    )
  }

  const DashboardContext = () => {
    return (
      <Dashboard firstName={firstName} />
    )
  }

  const LoginAuth = () => {
    return (
      <Login onAuth={onAuth} isAuthenticated={isAuthenticated} />
    )
  }

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Header
            isAuthenticated={isAuthenticated}
            firstName={firstName}
            lastName={lastName}
            onLogout={onLogout} />
          <Route exact path="/signup" component={SignupAuth} />
          <Route exact path="/login" component={LoginAuth} />
          <Route exact path="/dashboard" component={DashboardContext} />
          <Route exact path="/">{LoginAuth1(onAuth, isAuthenticated)}</Route>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
