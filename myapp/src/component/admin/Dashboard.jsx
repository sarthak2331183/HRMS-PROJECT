import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { auth, db } from '../../firebase'; // Import db from firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import Employee from "./Employee";
import Admin from "./Admin";
import { getDocs, query, collection, where } from "firebase/firestore";
import user from '../Employee/user.png'
import logo from '../Images/logo.png'



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

const Dashboard = () => {
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
      const date = new Date();
      const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      setCurrentDateTime(formattedDateTime);
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

  const openEmployee = () => {
    navigate('/Employee');
  };

  const openAdmin = () => {
    navigate('/Admin');
  };

  return (
    
    <div className="container">
      {/* aside section starts*/}
      <aside>
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
            selected={true}
            onSelect={() => {}}
          />
          <NavItem
            itemName="Admins"
            icon="diversity_3"
            onSelect={openAdmin}
          />
          <NavItem
            itemName="Employees"
            icon="diversity_3"
            onSelect={openEmployee}
          />
          <NavItem
            itemName="Attendance"
            icon="person_check"
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

      {/* main section starts*/}
      <main>
        <h1>Dashboard</h1>
        <h2>{greeting}</h2> 

        <p>Admin</p>

        <div className="inside">
          {/* start selling */}
          <div className="sales">
              <h3>On duty</h3>
              <h3>30</h3>


          </div>
          {/* ends selling */}

          {/* start expenses */}
          <div className="expenses">
          <h3>On Leave</h3>
              <h3>5</h3>
          </div>
          {/* ends expenses */}

          {/* start income*/}
          <div className="income">
          <h3>Late</h3>
              <h3>3</h3>
          </div>
          {/* ends income */}
        </div>
        {/* inside ends */}

        {/* start recent order */}
        <div className="recent_order">
          <h2>New Joins</h2>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Location</th>
                <th>Branch</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Innovate Suite</td>
                <td>IS-2023</td>
                <td className="danger">Pending</td>
                {/* <td className="warning">Processing</td> */}
              </tr>
              <tr>
                <td>CloudConnect</td>
                <td>CC-2452</td>
                <td className="danger">Paid</td>
                {/* <td className="warning">Delivered</td> */}
              </tr>
              <tr>
                <td>NetGuard Pro</td>
                <td>NG-2314</td>
                <td className="danger">Pending</td>
                {/* <td className="warning">Processing</td> */}
              </tr>
              <tr>
                <td>SmartTrack Lite</td>
                <td>ST-6563</td>
                <td className="danger">Pending</td>
                {/* <td className="warning">Processing</td> */}
              </tr>
              <tr>
                <td>DataScape Pro</td>
                <td>DS-5643</td>
                <td className="danger">Paid</td>
                {/* <td className="warning">Shipped</td> */}
              </tr>
            </tbody>
          </table>
        </div>
        {/* ends recent order */}
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
        <div className="date">
        <input type="text" value={currentDateTime} disabled />
        </div>
       {/* Starts upcoming tasks*/}
<div className="upcoming_tasks">
<div className="emp">
            <img src={user} alt="" />  
            <div className="emp2">
              <h3>{userName}</h3>
            </div>      
          </div>
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
{/* Ends upcoming tasks*/}


        {/* Starts employees on work*/}
        {/* <div className="employees_on_work">
          <h2>Employees On Work</h2>

          <div className="activity">
            <div className="OnWork">
              <span class="material-symbols-outlined">display_settings</span>
            </div>
            <div className="right_text">
              <div className="info">
                <h3>On Duty</h3>
                <small class="text-muted">Total no. of employees Working</small>
              </div>
              <h5 class="danger">44</h5>
            </div>
          </div>

          <div className="activity">
            <div className="OnLeave">
              <span class="material-symbols-outlined">
                <span class="material-symbols-outlined">event_busy</span>
              </span>
            </div>
            <div className="right_text">
              <div className="info">
                <h3>On Leave</h3>
                <small class="text-muted">
                  Total no. of employees on leave
                </small>
              </div>
              <h5 class="danger">20</h5>
            </div>
          </div>

          <div className="activity">
            <div className="Late">
              <span class="material-symbols-outlined">
                <span class="material-symbols-outlined">delete_history</span>
              </span>
            </div>
            <div className="right_text">
              <div className="info">
                <h3>Late</h3>
                <small class="text-muted">
                  Total no. of employees running late to work
                </small>
              </div>
              <h5 class="danger">11</h5>
            </div>
          </div>
        </div>
        {/* Ends employees on work*/}
      </div> 
      {/* right section ends*/}
    </div>
  );
};

export default Dashboard;
