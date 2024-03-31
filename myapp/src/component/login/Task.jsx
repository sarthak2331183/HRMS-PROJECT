import React, { useState } from 'react';
import './Task.css'; // Import the CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Here you can implement your login logic, such as calling an API
    // For simplicity, let's just check if the username and password match
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    alert('Forgot Password?');
  };

  return (
    <div className="container">
      <div className="content">
        <div className="picture">
          <img src={require('./Login.jpg')} alt="Frame1" />
        </div>
        <div className="form">
          <div className="login-container">
            {loggedIn ? (
              <div>
                <h2>Welcome, {username}!</h2>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <p onClick={handleForgotPassword} className="forgot-password">Forgot Password?</p> {/* Forgot Password link */}
                <button onClick={handleLogin}>Login</button>
            
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
