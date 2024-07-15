import React, { useState } from 'react';
import './Signin.css';

import config from '../config';

const {BASE_API_URL} = config

function Signin({userInfo, setUserInfo}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Add your sign-in logic here

    const ENDPOINT = `${BASE_API_URL}/auth/signin`

    const payload = {
      email : email,
      password : password
    }

    const OPTION = {
      method : "POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(payload)
    }

    console.log(OPTION)

    let res = await fetch(ENDPOINT, OPTION)

    res = await res.json()

    console.log(res)

  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
