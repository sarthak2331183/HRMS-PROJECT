import React, { useState } from "react";
import "./AddAdmin.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import logo from '../Images/logo.png';
import { createUserWithEmailAndPassword } from "firebase/auth";


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

const AddAdmin = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const [gender, setGender] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

  const openDashBoard = () => {
    navigate('/Dashboard');
  };
  const openEmployee = () => {
    navigate('/Employee');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Add a new document to the "employees" collection
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        mobile: mobile,
        userRole: userRole,
        gender: gender
      });

      // Reset form fields after successful submission
      setName("");
      setEmail("");
      setPassword("");
      setMobile("");
      setGender("");

      // Set success message
      setSuccessMessage("Employee added successfully!");

      // Navigate to employee page after a delay
      setTimeout(() => {
        navigate('/Dashboard');
      }, 2000); // Navigate after 2 seconds (adjust as needed)
      
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error adding employee:', error);
    }
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
            onSelect={openDashBoard}
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
        <h1>Add Admin</h1>
        {/* Popup for success and error messages */}
        {showPopup && (
          <div className="popup">
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="form">
          {/* Form fields */}
          <div className="row">
            <div className="column">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="column">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select One</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
          </div>
          <div className="row buttons">
            <button type="submit" className="add-button" >Add Admin</button>
            <button type="button" className="cancel-button">Cancel</button>
          </div>
        </form>
      </main>
      {/* main section ends*/}
    </div>
  );
};

export default AddAdmin;
