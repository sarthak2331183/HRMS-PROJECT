import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, collection, db } from "../../firebase";
import { getDocs, where, query } from 'firebase/firestore';
import Req from './Req';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReq, setShowReq] = useState(false);
  const navigate = useNavigate();

  const fetchUserRole = async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.userRole;
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
        navigate('/Dashboard');
      } else if (userRole === 'employee') {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          if (!userData.citizenshipId || !userData.age || !userData.parentsName || !userData.gender) {
            setShowReq(true);
            setLoading(false); // Set loading to false here to enable the login button
            return; // Prevent further execution of code
          } else {
            setShowReq(false); // Hide the requirement message if all fields are filled
            navigate('/Empdashboard');
          }
        } else {
          alert('User data not found.');
        }
      } else {
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
              <h2 id="login">Login</h2>
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
              <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {showReq && <Req email={email} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
