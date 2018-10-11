import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  login() {
    let {
      REACT_APP_DOMAIN,
      REACT_APP_CLIENT_ID
    } = process.env;

    let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default App;
