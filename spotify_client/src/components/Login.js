import React, { Component } from 'react';
import './css/Login.css';

class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="Login">
        <a href='http://localhost:8888'>
          <button className='btn login-button text-white'>Login with Spotify</button>
        </a>
      </div>
    );
  }
}

export default Login;
