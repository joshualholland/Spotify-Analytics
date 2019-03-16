import React from 'react';
import './css/Login.css';

const Login = () => {
    return (
      <div className="Login">
        <a href='http://localhost:8888'>
          <button className='btn login-button text-white'>Login with Spotify</button>
        </a>
      </div>
    );
}

export default Login;
