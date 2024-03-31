import './App.css';
import Dashboard from './component/admin/Dashboard';
import Login from './component/login/Login';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";





function App() {
  return (
    <div>
      {/* <Login /> */}
      <Dashboard />
      </div>
  );
}

export default App;
