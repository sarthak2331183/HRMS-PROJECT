import React, { useState, useEffect } from "react";
import "./Empattendances.css"
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import logo from '../Images/logo.png'
import user from '../Employee/user.png'
import { getDocs, query, collection, where } from "firebase/firestore";

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
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
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

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "attendance"), where("email", "==", userEmail))
        );
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [userEmail]);

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

  const openAttendance = () => {
    navigate('/EmpAttendance'); 
  };

  return (
    <div className="container">
      <aside className="likelynav left">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="close">
            <span className="material-symbols-outlined">crowdsource</span>
          </div>
        </div>

        <div className="sidebar">
          <NavItem
            itemName="Dashboard"
            icon="grid_view"
            selected={true}
            onSelect={() => {}}
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

      <div className="dashboard-container">
        <div className="navigation">
          <h2>Dashboard</h2>
          <span className="right-arrow">&#62;</span>
          <h2>Attendance</h2>
        </div>
        <div className="buttons">
  <div className="button-group">
    <div>
      <button className="green-button">Check-in Time</button>
      <p>Text for Check-in Time</p>
    </div>
    <div>
      <button className="red-button">Check-out Time</button>
      <p>Text for Check-out Time</p>
    </div>
    <div>
      <button className="green-button">Work Progress</button>
      <p>Text for Work Progress</p>
    </div>
  </div>
</div>


        <div className="attendance-record-container">
          <div className="left-section">
            <h2>Attendance Record</h2>
          </div>
          <div className="right-section">
            <button className="gray-button">Calendar</button>
            <button className="gray-button">Calendar</button>
            <button className="green-button">Show</button>
          </div>
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Check in Time</th>
              <th>Check out Time</th>
              <th>Hours Worked</th>
              <th>Worked On</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendanceRecord, index) => (
              <tr key={index}>
                <td>{attendanceRecord.date}</td>
                <td>{attendanceRecord.day}</td>
                <td>{attendanceRecord.checkInTime}</td>
                <td>{attendanceRecord.checkOutTime}</td>
                <td>{attendanceRecord.hoursWorked}</td>
                <td>{attendanceRecord.workedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>

      <div className="right">
        <div className="top">
          <button id="menu_bar">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
        
        <div className="upcoming_tasks">
          <p>{currentDateTime}</p> 
          <div className="emp">
            <img src={user} alt="" />  
            <div className="emp2">
              <h3>{userName}</h3>
              <p>Employee</p>
            </div>      
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpAttendance;
