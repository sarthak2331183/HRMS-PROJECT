import './App.css';
import Dashboard from './component/admin/Dashboard';
import Task from "./component/login/Task"

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";




function App() {
  return (
    <div>
      {/* <Task /> */}
      <Dashboard />
      </div>
  );
}

export default App;
