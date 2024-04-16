import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, collection, db } from "../../firebase"; // Import collection and db
import { getDocs, where, query } from 'firebase/firestore'; // Import Firestore query functions

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserRole = async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email)); // Query the users collection by email
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.userRole; // Assuming the role is stored in a field named "userRole"
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userRole = await fetchUserRole(email);
      if (userRole === 'admin') {
        navigate('/Dashboard'); // Navigate to admin dashboard
      } else if (userRole === 'employee') {
        navigate('/Empdashboard'); // Navigate to employee dashboard
      } else {
        // Handle other roles or scenarios
        alert('User role not found.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid email or password!!');
    }
    setLoading(false);
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
                <h2 id = "login">Login</h2>
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
