import React from "react";
import "./Empdashboard.css";
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
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

const Empdashboard = () => {

const navigate = useNavigate();

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
        <h1>Hello</h1> <h3>Swekchhya</h3>
        <p>Admin</p>
        <div className="date">
          <input type="date" />
        </div>

        <div className="mytask">
            <div className="lef">
                <p>1 active task</p>
                <h2>Hello</h2>
            </div>
            <div className="mid">
            <p>1 active task</p>
                <h2>Hello</h2>
            </div>
            <div className="rig">
            <p>1 active task</p>
                <h2>Hello</h2>
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
    <h4>Attendance</h4>
    <h4>Profile</h4>

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

export default  Empdashboard;
