import React, { useState, useEffect } from "react";
import "./Empdashboard.css";
import logo from "../Images/logo.png";
import search from "../Employee/search_mg.png";
import notification from "../Employee/notification.png";
import user from "../Employee/user.png";
import attendance from "../Employee/attendance.png";
import chart from "../Employee/chart.png";

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

const Profile = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

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
          <NavItem itemName="Log out" icon="logout" onSelect={() => {}} />
        </div>
      </aside>
      {/* aside section ends */}

      {/* right section starts*/}
      <div className="right-section">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-picture">
              <img src={user} alt="Profile" />
            </div>
            <div className="profile-info">
              <h1>Aashish Thapa</h1>
              <p>EMP-01</p>
            </div>
          </div>
          <div className="profile-content">
            <div className="profile-item">
              <h2>Personal Information</h2>
              <div className="profile-data">
                <div className="data-item">
                  <p>Gender:</p>
                  <span>Male</span>
                </div>
                <div className="data-item">
                  <p>Phone:</p>
                  <span>977-982-747-5866</span>
                </div>
                <div className="data-item">
                  <p>Marital Status:</p>
                  <span>Single</span>
                </div>
                <div className="data-item">
                  <p>Email:</p>
                  <span>email21@email.com</span>
                </div>
                <div className="data-item">
                  <p>Country:</p>
<span>Nepal</span>
                </div>
                <div className="data-item">
                  <p>Date of Birth:</p>
                  <span>March 26, 2000</span>
                </div>
              </div>
            </div>
            <div className="profile-item">
              <h2>Address</h2>
              <div className="profile-data">
                <div className="data-item">
                  <p>Address:</p>
                  <span>Aashish Thapa, Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* right section ends*/}
    </div>
  );
};

export default Profile;