import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Dashboard from '../admin/Dashboard';
import ForgetPassword from './ForgetPassword';
import { auth, db } from "../../firebase";
import { doc, getDoc } from 'firebase/firestore';
import Empdashboard from '../Employee/Empdashboard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  // const fetchUserRole = async (email) => {
  //   const userRef = db.collection('users').doc(email);
  
  //   try {
  //     const userSnap = await userRef.get();
  
  //     if (userSnap.exists) {
  //       const userData = userSnap.data();
  //       return userData.userRole; // Assuming the role is stored in a field named "role"
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user role:', error);
  //     return null;
  //   }
  // };
  

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     const userRole = await fetchUserRole(email);
  //     if (userRole === 'employee') {
  //       navigate('/Empdashboard');
  //     } else if (userRole === 'admin') {
  //       navigate('/Dashboard');
  //     } else {
  //       // Handle other roles or scenarios
  //       alert('User role not found.');
  //     }
  //   } catch (error) {
  //     alert('Invalid email or password!!')
  //     setError(true);
  //   }
  //   setLoading(false);
  // };

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
    navigate('/ForgetPassword');
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
                <p onClick={handleForgotPassword} className="forgot-password">Forgot Password?</p>
                <button onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
