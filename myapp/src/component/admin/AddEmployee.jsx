import React, { useState } from "react";
import "./AddEmployee.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import logo from "../Images/logo.png";
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

const AddEmployee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [userRole, setUserRole] = useState("employee");
  const [employmentType, setEmploymentType] = useState("");
  const [gender, setGender] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [branch, setBranch] = useState("");
  const [citizenshipId, setCitizenshipId] = useState("");
  const [age, setAge] = useState("");
  const [parentsName, setParentsName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    }
  };

  const openDashBoard = () => {
    navigate("/Dashboard");
  };

  const openEmployee = () => {
    navigate("/Employee");
  };


  const openAdmin = () => {
    navigate('/Admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Add a new document to the "users" collection with the employee name as document name
      await addDoc(collection(db, "users"), {
        name: name,
        employeeId: employeeId,
        email: email,
        mobile: mobile,
        userRole: userRole,
        employmentType: employmentType,
        gender: gender,
        jobTitle: jobTitle,
        branch: branch,
        // Add Citizenship ID, Age, and Parents' Name to the database but not shown in UI
        citizenshipId: citizenshipId,
        age: age,
        parentsName: parentsName,
      });

      // Reset form fields after successful submission
      setName("");
      setEmployeeId("");
      setEmail("");
      setPassword("");
      setMobile("");
      setEmploymentType("");
      setGender("");
      setJobTitle("");
      setBranch("");

      // Set success message
      setSuccessMessage("Employee added successfully!");

      // Navigate to employee page after a delay
      setTimeout(() => {
        navigate("/Employee");
      }, 2000); // Navigate after 2 seconds (adjust as needed)
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error adding employee:", error);
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
            itemName="Admins"
            icon="diversity_3"
            selected={true}
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
        <h1 id="addemployee">Add Employee</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="fom">
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
            <div className="column">
              <label htmlFor="employeeId">Employee ID:</label>
              <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
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
            <div className="column">
              <label htmlFor="jobTitle">Job Title:</label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="branch">Branch:</label>
              <select
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
              >
                <option value="">Select One</option>
                <option value="branch1">Branch 1</option>
                <option value="branch2">Branch 2</option>
                <option value="branch3">Branch 3</option>
              </select>
            </div>

            <div className="column">
              <label htmlFor="employmentType">Employment Type:</label>
              <select
                id="employmentType"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                required
              >
                <option value="">Select One</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="column">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select One</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="column">
              {/* These fields are not shown in the UI */}
              {/* Citizenship ID, Age, Gender, and Parents' Name */}
            </div>
          </div>

          <div className="row buttons">
            <button type="submit" className="addbtn">
              Add Employee
            </button>
            <button type="button" className="cancelbtn">
              Cancel
            </button>
          </div>
        </form>
      </main>
      {/* main section ends*/}
    </div>
  );
};

export default AddEmployee;
