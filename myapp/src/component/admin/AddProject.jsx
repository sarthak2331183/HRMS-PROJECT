// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../Images/logo.png"; // Ensure the path to the logo is correct
// import "./AddProject.css";

// // Sidebar navigation item
// const NavItem = ({ itemName, icon, selected, onSelect }) => (
//   <a
//     href="#"
//     className={selected ? "active" : ""}
//     onClick={() => onSelect(itemName)}
//   >
//     <span className="material-symbols-outlined">{icon}</span>
//     <h3>{itemName}</h3>
//   </a>
// );

// const AddProject = () => {
//   const navigate = useNavigate();

//   // State variables for form fields
//   const [projectTitle, setProjectTitle] = useState("");
//   const [clientName, setClientName] = useState("");
//   const [status, setStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // Sidebar navigation functions
//   const openDashboard = () => navigate("/Dashboard");
//   const openAdmin = () => navigate("/Admin");
//   const openEmployee = () => navigate("/Employee");
//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       navigate("/");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Logic for handling project submission

//     // Reset form fields
//     setProjectTitle("");
//     setClientName("");
//     setStatus("");
//     setStartDate("");
//     setEndDate("");
//     setAssignedTo("");

//     setSuccessMessage("Project added successfully!");

//     // Redirect after a delay
//     setTimeout(() => {
//       navigate("/Project");
//     }, 2000);
//   };

//   return (
//     <div className="container">
//       {/* Sidebar */}
//       <aside>
//         <div className="top">
//           <div className="logo">
//             <img src={logo} alt="Logo" />
//           </div>
//           <div className="close">
//             <span className="material-symbols-outlined">crowdsource</span>
//           </div>
//         </div>

//         <div className="sidebar">
//           <NavItem
//             itemName="Dashboard"
//             icon="grid_view"
//             onSelect={openDashboard}
//           />
//           <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
//           <NavItem
//             itemName="Employees"
//             icon="diversity_3"
//             onSelect={openEmployee}
//           />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Payroll" icon="paid" />
//           <NavItem itemName="Setting" icon="settings" />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       {/* Main content */}
//       <main>
//         <h1>Add Project</h1>

//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {errorMessage && <p className="error-message">{errorMessage}</p>}

//         <form onSubmit={handleSubmit} className="project-form">
//           {/* Form fields for project data */}
//           <div className="row">
//             <div className="column">
//               <label htmlFor="projectTitle">Project Title:</label>
//               <input
//                 type="text"
//                 id="projectTitle"
//                 value={projectTitle}
//                 onChange={(e) => setProjectTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="column">
//               <label htmlFor="clientName">Client Name:</label>
//               <input type="text" id="clientName" value={clientName} />
//             </div>
//           </div>

//           <div className="row">
//             <div className="column">
//               <label htmlFor="status">Status:</label>
//               <input type="text" id="status" value={status} />
//             </div>
//             <div classColumn>
//               <label htmlFor="startDate">Start Date:</label>
//               <input type="date" id="startDate" />
//             </div>
//           </div>

//           <div className="row">
//             <div classColumn>
//               <label htmlFor="endDate">End Date:</label>
//               <input type="date" id="endDate" />
//             </div>
//             <div classColumn>
//               <label htmlFor="assignedTo">Assigned To:</label>
//               <input type="text" id="assignedTo" />
//             </div>
//           </div>

//           <div className="row buttons">
//             <button type="submit" className="addbtn">
//               Add Project
//             </button>
//             <button
//               type="button"
//               className="cancelbtn"
//               onClick={() => navigate("/Project")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default AddProject;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebase";
// import { collection, addDoc } from "firebase/firestore";
// import logo from "../Images/logo.png"; // Ensure the path to the logo is correct
// import "./AddProject.css";

// // Sidebar navigation item
// const NavItem = ({ itemName, icon, selected, onSelect }) => (
//   <a
//     href="#"
//     className={selected ? "active" : ""}
//     onClick={() => onSelect(itemName)}
//   >
//     <span className="material-symbols-outlined">{icon}</span>
//     <h3>{itemName}</h3>
//   </a>
// );

// const AddProject = () => {
//   const navigate = useNavigate();

//   // State variables for form fields
//   const [projectTitle, setProjectTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const openDashboard = () => navigate("/Dashboard");
//   const openAdmin = () => navigate("/Admin");
//   const openEmployee = () => navigate("/Employee");
//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       navigate("/");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await addDoc(collection(db, "project"), {
//         title: projectTitle,
//         startDate,
//         endDate,
//         description: projectDescription
//       });

//       setSuccessMessage("Project added successfully!");
//       setTimeout(() => {
//         navigate("/Project");
//       }, 2000);
//     } catch (error) {
//       console.error("Error adding project:", error);
//       setErrorMessage("Failed to add project.");
//     }

//     setProjectTitle("");
//     setStartDate("");
//     setEndDate("");
//     setProjectDescription("");
//   };

//   return (
//     <div className="container">
//       {/* Sidebar */}
//       <aside>
//         <div className="top">
//           <div className="logo">
//             <img src={logo} alt="Logo" />
//           </div>
//           <div className="close">
//             <span className="material-symbols-outlined">crowdsource</span>
//           </div>
//         </div>

//         <div className="sidebar">
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={openDashboard} />
//           <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
//           <NavItem itemName="Employees" icon="diversity_3" onSelect={openEmployee} />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Payroll" icon="paid" />
//           <NavItem itemName="Setting" icon="settings" />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       {/* Main content */}
//       <main>
//         <h1>Add Project</h1>

//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {errorMessage && <p className="error-message">{errorMessage}</p>}

//         <form onSubmit={handleSubmit} className="project-form">
//           {/* Form fields for project data */}
//           <div className="row">
//             <div className="column">
//               <label htmlFor="projectTitle">Project Title:</label>
//               <input
//                 type="text"
//                 id="projectTitle"
//                 value={projectTitle}
//                 onChange={(e) => setProjectTitle(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="column">
//               <label htmlFor="startDate">Start Date:</label>
//               <input
//                 type="date"
//                 id="startDate"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="column">
//               <label htmlFor="endDate">End Date:</label>
//               <input
//                 type="date"
//                 id="endDate"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="column">
//               <label htmlFor="projectDescription">Project Description:</label>
//               <textarea
//                 id="projectDescription"
//                 value={projectDescription}
//                 onChange={(e) => setProjectDescription(e.target.value)}
//                 required
//                 rows="10"
//               />
//             </div>
//           </div>

//           <div className="row buttons">
//             <button type="submit" className="addbtn">
//               Add Project
//             </button>
//             <button
//               type="button"
//               className="cancelbtn"
//               onClick={() => navigate("/Project")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default AddProject;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import logo from "../Images/logo.png";
import "./AddProject.css";

// Sidebar navigation item
const NavItem = ({ itemName, icon, selected, onSelect }) => (
  <a
    href="#"
    className={selected ? "active" : ""}
    onClick={() => onSelect(itemName)}
  >
    <span className="material-symbols-outlined">{icon}</span>
    <h3>{itemName}</h3>
  </a>
);

const AddProject = () => {
  const navigate = useNavigate();

  // State variables for form fields
  const [projectTitle, setProjectTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const userList = snapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedUsers = users.slice(0, 5); // Select the first 5 users
      await addDoc(collection(db, "project"), {
        title: projectTitle,
        startDate,
        endDate,
        description: projectDescription,
        status: "Pending",
        members: selectedUsers.map(user => ({ name: user.name, email: user.email }))
      });

      setSuccessMessage("Project added successfully!");
      setTimeout(() => {
        navigate("/Project");
      }, 2000);
    } catch (error) {
      console.error("Error adding project:", error);
      setErrorMessage("Failed to add project.");
    }

    setProjectTitle("");
    setStartDate("");
    setEndDate("");
    setProjectDescription("");
  };

  return (
    <div className="container">
      <aside>
        <div className="top">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="close">
            <span className="material-symbols-outlined">crowdsource</span>
          </div>
        </div>

        <div className="sidebar">
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Dashboard")} />
          <NavItem itemName="Admins" icon="diversity_3" onSelect={() => navigate("/Admin")} />
          <NavItem itemName="Employees" icon="diversity_3" onSelect={() => navigate("/Employee")} />
          <NavItem itemName="Projects" icon="model_training" selected={true} />
          <NavItem itemName="Payroll" icon="paid" />
          <NavItem itemName="Setting" icon="settings" />
          <NavItem itemName="Log out" icon="logout" onSelect={() => {
            const confirmed = window.confirm("Are you sure you want to log out?");
            if (confirmed) navigate("/");
          }} />
        </div>
      </aside>

      <main>
        <h1>Add Project</h1>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="project-form">
          <div className="row">
            <div className="column">
              <label htmlFor="projectTitle">Project Title:</label>
              <input
                type="text"
                id="projectTitle"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="column">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="projectDescription">Project Description:</label>
              <textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                rows="10"
              />
            </div>
          </div>

          <div className="row buttons">
            <button type="submit" className="addbtn">
              Add Project
            </button>
            <button
              type="button"
              className="cancelbtn"
              onClick={() => navigate("/Project")}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProject;
