import React, { useState, useEffect } from 'react';
import './App.css';
import { getAuth } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './component/admin/Dashboard';
import Login from './component/login/Login';
import Employee from './component/admin/Employee';
import AddEmployee from './component/admin/AddEmployee';
import Empdashboard from './component/Employee/Empdashboard';
import ForgetPassword from './component/login/ForgetPassword';
import AddAdmin from './component/admin/AddAdmin';
import Admin from './component/admin/Admin';
import Attendance from './component/admin/Attendance';
import Project from './component/admin/Project';
import Profile from './component/Employee/Profile';
import EmpAttendance from './component/Employee/EmpAttendance'
import AddProject from './component/admin/AddProject';
import Empleave from './component/Employee/Empleave';
import Leave from './component/admin/Leave';
import LeaveTypes from './component/admin/LeaveTypes';

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
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/Empdashboard" element={<Empdashboard />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/EmpAttendance" element={<EmpAttendance />} />
        <Route path="/AddProject" element={<AddProject />} />
        <Route path="/Empleave" element={<Empleave />} />
        <Route path="/Leave" element={<Leave />} />
        <Route path="/LeaveTypes" element={<LeaveTypes />} />
      </Routes>
    </Router>
  );
}

export default App;