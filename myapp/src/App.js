import React from 'react';
import './App.css';
import Dashboard from './component/admin/Dashboard';
import Login from './component/login/Login';
import Employee from './component/admin/Employee'; 

function App() {
  return (
    <div>
      <Login />
      <Dashboard />
      <Employee />
    </div>
  );
}

export default App;

