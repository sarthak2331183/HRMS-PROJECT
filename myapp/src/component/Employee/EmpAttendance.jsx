import React, { useState, useEffect } from "react";
import "./Empdashboard.css";
import { auth, db } from '../../firebase'; // Import db from firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import logo from '../Images/logo.png'
import search from '../Employee/search_mg.png'
import notification from '../Employee/notification.png'
import user from '../Employee/user.png'
import attendance from '../Employee/attendance.png'
import profile from '../Employee/profile.png'
import chart from '../Employee/chart.png'
import { getDocs, query, collection, where } from "firebase/firestore";
import Profile from './Profile'
import Empdashboard from "./Empdashboard";

const NavItem = ({ itemName, icon, selected, onSelect }) => {
  return (
    <a
      href="#"
      className={selected ? "active" : ""}
      onClick={() => onSelect(itemName)}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <h3>{itemName}</h3>
    </a>
  );
};

const EmpAttendance = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        // Fetch name from Firestore based on user email
        try {
          const querySnapshot = await getDocs(
            query(collection(db, "users"), where("email", "==", user.email))
          );
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUserName(userData.name);
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserEmail("");
        setUserName("");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setCurrentDateTime(`${date} ${time}`);
    };

    updateDateTime(); // Update immediately
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    if (hour >= 5 && hour < 12) {
      greetingText = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good Afternoon";
    } else if (hour >= 17 && hour < 20) {
      greetingText = "Good Evening";
    } else {
      greetingText = "Good Night";
    }
    setGreeting(`${greetingText}, ${userName}`);
  }, [userName]);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
    }
  };

  const openDashboard = () => {
    navigate('/Empdashboard');
  };

  // const openAdmin = () => {
  //   navigate('/Admin');
  // };

  return (
    <div className="container">
      {/* aside section starts*/}
      <aside className="likelynav">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="close">
            <span className="material-symbols-outlined">crowdsource</span>
          </div>
        </div>
        {/* top ends */}

        <div className="sidebar">
          <NavItem
            itemName="Dashboard"
            icon="grid_view"
            onSelect={openDashboard}
          />
          <NavItem
            itemName="Attendance"
            icon="person_check"
            selected={true}
            onSelect={() => {}}
          />
          <NavItem
            itemName="Projects"
            icon="model_training"
            onSelect={() => {}}
          />
          <NavItem itemName="Payroll" icon="paid" onSelect={() => {}} />
          <NavItem itemName="Setting" icon="settings" onSelect={() => {}} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>
      {/* aside section ends */}

      {/* Top Section  */}
      {/* main section starts*/}
      <main>
      <h1>Attendance</h1>
        <h2>{greeting}</h2>
        <p>Employee</p>
        
        <div className="tasks">
          <span className="table_head"><h2>My tasks</h2></span> 
          <div className="bar_info">
            <p>1 Active Task </p>
            <p>Due Date</p>
            <p>Status</p>
          </div>
          <div className="tasksleft">
            <h3>Sprint 1 designining</h3>
            <h3>Today</h3> 
            <input type="number" placeholder="In Progress" name="" id="" />
          </div>
  
          <div className="alltasks">
            <hr />
            <h2>See all tasks</h2>
          </div>
        </div>

        <div className="working_hour">
          <span className="table_head"><h2>Total hours worked this week</h2></span> 
          <div className="chart_hrs">
            <div className="hrs">
              <h2>8 hrs</h2>
              <h2>6 hrs</h2>
              <h2>4 hrs</h2>
              <h2>2 hrs</h2>
            </div>

            <div className="chart">
              <img src={chart} alt="" />
            </div>
          </div>
        </div>
      </main>
      {/* main section ends*/}

      {/* right section starts*/}
      <div className="right">
        <div className="top">
          <button id="menu_bar">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
        {/* ends top */}
       
        {/* Starts upcoming tasks*/}
        <div className="upcoming_tasks">
        <p>{currentDateTime}</p> 
          <div className="emp">
          
            <img src={user} alt="" />  
            <div className="emp2">
              <h3>{userName}</h3>
              <p>Employee</p>
            </div>      
          </div>
        
        
          <div className="rnd">
            <h4>Attendance <img src={attendance} alt="" /></h4>
            <h2>Upcoming Tasks</h2>
            <div className="Meetings">
              <div className="meeting">
                <div className="circle">
                  <span className="number">1</span>
                </div>
                <div className="details">
                  <p>
                    <b>Team Meeting</b>
                  </p>
                  <p>Group D</p>
                  <small className="text-muted"></small>
                </div>
                <div className="time">
                  <p>12:00-13:00</p>
                  <span className="material-symbols-outlined">more_vert</span>
                </div>
              </div>
              <div className="meeting">
                <div className="circle">
                  <span className="number">2</span>
                </div>
                <div className="details">
                  <p>
                    <b>Team Meeting</b>
                  </p>
                  <p>Group D</p>
                  <small className="text-muted"></small>
                </div>
                <div className="time">
                  <p>12:00-13:00</p>
                  <span className="material-symbols-outlined">more_vert</span>
                </div>
              </div>
              <div className="meeting">
                <div className="circle">
                  <span className="number">3</span>
                </div>
                <div className="details">
                  <p>
                    <b>Team Meeting</b>
                  </p>
                  <p>Group D</p>
                  <small className="text-muted"></small>
                </div>
                <div className="time">
                  <p>1:00-13:00</p>
                  <span className="material-symbols-outlined">more_vert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Ends upcoming tasks*/}
      </div> 
      {/* right section ends*/}
    </div>
  );
};

export default EmpAttendance;
