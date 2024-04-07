import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './component/admin/Dashboard';
import Login from './component/login/Login';
import Employee from './component/admin/Employee';
import { getAuth } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddEmployee from './component/admin/AddEmployee';
import Empdashboard from './component/Employee/Empdashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/Employee"
          element={
            <RequireAuth>
              <Employee />
            </RequireAuth>
          }
        />
        <Route
          path="/AddEmployee"
          element={
            <RequireAuth>
              <AddEmployee />
            </RequireAuth>
          }
        />
        {/* <Route
          path="/"
          element={
            
              <Empdashboard />
            
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;