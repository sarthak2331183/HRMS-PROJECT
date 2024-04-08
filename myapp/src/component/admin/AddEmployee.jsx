// import React, { useState } from "react";
// import "./AddEmployee.css";
// import { useNavigate } from "react-router-dom";
// import { auth } from '../../firebase';
// import { signOut } from 'firebase/auth';
// import logo from '../Images/logo.png'

// const NavItem = ({ itemName, icon, selected, onSelect }) => {
//   return (
//     <a
//       href="#"
//       className={selected ? "active" : ""}
//       onClick={() => onSelect(itemName)}
//     >
//       <span className="material-symbols-outlined">{icon}</span>
//       <h3>{itemName}</h3>
//     </a>
//   );
// };
// const AddEmployee = () => {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     const confirmed = window.confirm('Are you sure you want to log out?');
//     if (confirmed) {
//       signOut(auth).then(() => {
//         navigate('/');
//       }).catch((error) => {
//         console.error('Error signing out:', error);
//       });
//     }
//   };
//   const openDashBoard = () => {
//     navigate('/Dashboard');
//   };

//   return (
//     <div className="container">
//       {/* aside section starts*/}
//       <aside>
//       <div className="top">
//           <div className="logo">
//             <img src={logo} alt="Logo" />
//           </div>
//           <div className="close">
//             <span className="material-symbols-outlined">crowdsource</span>
//           </div>
//         </div>
//         {/* top ends */}

//         <div className="sidebar">
//           <NavItem
//             itemName="Dashboard"
//             icon="grid_view"
//             selected={true}
//             onSelect={openDashBoard}
//           />
//           <NavItem
//             itemName="Employees"
//             icon="diversity_3"
//             onSelect={() => {}}
//           />
//           <NavItem
//             itemName="Attendance"
//             icon="person_check"
//             onSelect={() => {}}
//           />
//           <NavItem
//             itemName="Projects"
//             icon="model_training"
//             onSelect={() => {}}
//           />
//           <NavItem itemName="Payroll" icon="paid" onSelect={() => {}} />
//           <NavItem itemName="Setting" icon="settings" onSelect={() => {}} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>
//       {/* aside section ends */}

//       {/* main section starts*/}
//       <main>
//         <h1>Hello World</h1>



//       </main>
//       {/* main section ends*/}
//     </div>
//   );
// };

// export default AddEmployee;


import React, { useState } from "react";
import "./AddEmployee.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
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

const AddEmployee = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [userRole, setUserRole] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [gender, setGender] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [branch, setBranch] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
          <NavItem
            itemName="Payroll"
            icon="paid"
            onSelect={() => {}}
          />
          <NavItem
            itemName="Setting"
            icon="settings"
            onSelect={() => {}}
          />
          <NavItem
            itemName="Log out"
            icon="logout"
            onSelect={handleLogout}
          />
        </div>
      </aside>
      {/* aside section ends */}

      {/* main section starts*/}
      <main>
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit} className="form">
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
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
              <label htmlFor="userRole">User Role:</label>
              <select
                id="userRole"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                required
              >
                <option value="">Select One</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
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
                <option value="fullTime">Full Time</option>
                <option value="partTime">Part Time</option>
                <option value="contract">Contract</option>
              </select>
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
          </div>
          <div className="row buttons">
            <button type="submit" className="add-button">Add Employee</button>
            <button type="button" className="cancel-button">Cancel</button>
          </div>
        </form>
      </main>
      {/* main section ends*/}
    </div>
  );
};

export default AddEmployee;