import React, { Component } from 'react';
import './css/Login.css';

import LoginLogo from './svg/LoginLogo';


export default class Login extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    var path = document.querySelector("svg path");
    var total_length = path.getTotalLength();
    console.log(total_length)
  }

  render() {
    return (
      <div className="Login">
        <LoginLogo id='login-logo' />
        <a href='http://localhost:8888'>
          <button className='btn login-button text-white'>Login with Spotify</button>
        </a>
      </div>
    )
  }


}

