import React, { useState } from 'react';
import './Login.css';
import {useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Dashboard from '../admin/Dashboard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        navigate('Dashboard');
      })
      .catch((error) => {
        alert('Invalid email or passowrd!!')
        setError(true);
      });
  };

  const handleForgotPassword = () => {
   alert('Forgot Password?');
  };

  return (
    <div className="container-login">
      <div className="content">
        <div className="picture">
          <img src={require('./Login.jpg')} alt="Frame1" />
        </div>
        <div className="form">
          <div className="login-container">
              <div>
                <h2>Login</h2>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <p onClick={handleForgotPassword} className="forgot-password">Forgot Password?</p> {/* Forgot Password link */}
                <button onClick={handleLogin}>Login</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
