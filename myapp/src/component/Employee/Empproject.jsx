// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Empdashboard.css";
// import logo from '../Images/logo.png';

// import "./Empproject.css";

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

// const Empproject = () => {
//   const navigate = useNavigate();

//   const handleAddProject = () => {
//     navigate('/AddProject');
//   };

//   const openProject = () => {
//     navigate("/Projects");
//   };

//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       title: "Project A",
//       clientName: "Client 1",
//       status: "Ongoing",
//       startDate: "2024-01-15",
//       endDate: "2024-07-30",
//       assignedTo: "Team Alpha",
//     },
//     {
//       id: 2,
//       title: "Project B",
//       clientName: "Client 2",
//       status: "Completed",
//       startDate: "2023-06-10",
//       endDate: "2023-12-20",
//       assignedTo: "Team Beta",
//     },
//   ]);

//   const handleEdit = (projectId) => {
//     console.log("Editing project with ID:", projectId);
//     // Logic for editing (e.g., open a modal or navigate to an edit page)
//   };

//   const handleDelete = (projectId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this project?"
//     );
//     if (confirmed) {
//       setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
//     }
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       navigate("/");
//     }
//   };

//   const openDashboard = () => navigate("/Empdashboard");
//   const openEmployee = () => navigate("/Employee");
//   const openAdmin = () => navigate("/Admin");
//   const openAttendance = () => navigate("/Attendance");
//   const openLeave = () => navigate("/Leave");

//   const upcomingProjects = projects.filter(
//     (project) => new Date(project.startDate) > new Date()
//   );
//   const inProgressProjects = projects.filter(
//     (project) => project.status === 'Ongoing'
//   );
//   const completedProjects = projects.filter(
//     (project) => project.status === 'Completed'
//   );
//   const cancelledProjects = projects.filter(
//     (project) => project.status === 'Cancelled'
//   );
//   const endedProjects = projects.filter(
//     (project) => new Date(project.endDate) < new Date() || project.status === 'Ended'
//   );

//   return (
//     <div className="container">
//       {/* Sidebar */}
//       <aside className="likelynav">
//         <div className="top">
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
//             onSelect={openDashboard}
//           />
//           <NavItem
//             itemName="Attendance"
//             icon="person_check"
//             onSelect={openAttendance}
//           />
//           <NavItem
//             itemName="Projects"
//             icon="model_training"
//             onSelect={openProject}
//           />
//           <NavItem itemName="Leave" icon="paid" onSelect={openLeave} />
//           <NavItem itemName="Setting" icon="settings" onSelect={() => {}} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       {/* Main content */}
//       <main>
//         <h1 id="employee">Project Summary</h1>

//         {/* Project statistics */}
//         <div className="project-stats">
//           <button className="stat-btn">Upcoming: {upcomingProjects.length}</button>
//           <button className="stat-btn">In Progress: {inProgressProjects.length}</button>
//           <button className="stat-btn">Completed: {completedProjects.length}</button>
//           <button className="stat-btn">Cancelled: {cancelledProjects.length}</button>
//           <button className="stat-btn">Ended: {endedProjects.length}</button>
//         </div>

//         {/* Project table and search */}
//         <div className="employee_details">
//           <div className="srh-container">
//             <div className="search">
//               <span className="material-symbols-outlined">search</span>
//               <input type="text" placeholder="Enter project title..." />
//             </div>
//             <button className="add-project-btn" onClick={handleAddProject}>
//               <span className="material-symbols-outlined">add</span>
//               Add Progress
//             </button>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Project Title</th>
//                 <th>Client Name</th>
//                 <th>Status</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//                 <th>Assigned To</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project) => (
//                 <tr key={project.id}>
//                   <td>{project.title}</td>
//                   <td>{project.clientName}</td>
//                   <td>{project.status}</td>
//                   <td>{project.startDate}</td>
//                   <td>{project.endDate}</td>
//                   <td>{project.assignedTo}</td>
//                   <td>
//                     <button
//                       className="edit-btn"
//                       onClick={() => handleEdit(project.id)}
//                     >
//                       Open
//                     </button>
                    
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div style={{ width: 1126, height: 109, left: 250, top: -10, position: 'absolute' }}>
        
//           <div style={{ width: 252, height: 58, left: 799, top: 30, position: 'absolute' }}>
//             <div style={{ left: 77, top: 0, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Aashish Thapa</div>
//             <div style={{ width: 58, height: 58, left: 0, top: -6, position: 'absolute', borderRadius: 9999 }}>
//               <img src={require('./user.png')} alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
//             </div>

//             <div style={{ left: 77, top: 29, position: 'absolute', color: 'rgba(0, 0, 0, 0.50)', fontSize: 16, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Employee</div>
//             <div style={{ width: 11, height: 11, left: 189, top: 34, position: 'absolute' }}>
//               <div style={{ width: 11, height: 11, left: 0, top: 0, position: 'absolute', background: '#00C608', borderRadius: 9999 }} />
//               <div style={{ width: 4.40, height: 4.40, left: 3.30, top: 3.30, position: 'absolute', background: 'white' }}></div>
//             </div>
//           </div>
//         </div>

//         {/* Additional elements */}
//         <div style={{ left: 455, top: 80, position: 'absolute', color: 'Blue', fontSize: 20, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Projects</div>
//         <div style={{ left: 320, top: 77, position: 'absolute', color: 'rgba(0, 0, 0, 0.50)', fontSize: 24, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Dashboard &gt;</div>
//         <div style={{ width: 1090, height: 0, left: 320, top: 100, position: 'absolute', border: '1px black solid' }}></div>
//       </main>
//     </div>
//   );
// };

// export default Empproject;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
// import { db } from "../../firebase";

// import logo from '../Images/logo.png';


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

// const Empproject = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectCollection = collection(db, "project");
//         const snapshot = await getDocs(projectCollection);
//         const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setProjects(data);
//         setFilteredProjects(data); // Initially, set filteredProjects to all projects
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleAddProject = () => {
//     navigate('/AddProject');
//   };

//   const handleOpenProject = (projectId) => {
//     navigate(`/OpenProject/${projectId}`);
//   };

//   const handleDelete = async (projectId) => {
//     const confirmed = window.confirm("Are you sure you want to delete this project?");
//     if (confirmed) {
//       try {
//         await deleteDoc(doc(db, "project", projectId));
//         // Update both projects and filteredProjects after deletion
//         setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
//         setFilteredProjects((prevFilteredProjects) => prevFilteredProjects.filter((p) => p.id !== projectId));
//       } catch (error) {
//         console.error("Error deleting project:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (projectId, newStatus) => {
//     try {
//       const projectRef = doc(db, "project", projectId);
//       await updateDoc(projectRef, { status: newStatus });
//       setProjects((prevProjects) => prevProjects.map((p) => p.id === projectId ? { ...p, status: newStatus } : p));
//       setFilteredProjects((prevFilteredProjects) => prevFilteredProjects.map((p) => p.id === projectId ? { ...p, status: newStatus } : p));
//     } catch (error) {
//       console.error("Error updating project status:", error);
//     }
//   };

//   const filterProjects = (status) => {
//     if (status === "All") {
//       return projects;
//     } else {
//       return projects.filter(project => project.status === status);
//     }
//   };

//   const handleFilterClick = (status) => {
//     setFilter(status);
//     if (status === "All") {
//       setFilteredProjects(projects); // Set filteredProjects to all projects
//     } else {
//       const filtered = projects.filter(project => project.status === status);
//       setFilteredProjects(filtered);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     const filtered = projects.filter(project =>
//       project.title.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   return (
//     <div className="container">
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Dashboard")} />
//           <NavItem itemName="Admins" icon="diversity_3" onSelect={() => navigate("/Admin")} />
//           <NavItem itemName="Employees" icon="badge" onSelect={() => navigate("/Employee")} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/Attendance")} />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={() => navigate("/Leave")} />
//           <NavItem itemName="Log out" icon="logout" onSelect={() => {
//             const confirmed = window.confirm("Are you sure you want to log out?");
//             if (confirmed) navigate("/");
//           }} />
//         </div>
//       </aside>

//       <main>
//         <h1 id="employee1">Project</h1>

//         <div className="project-stats">
//           <button className="stat-btn" onClick={() => handleFilterClick("All")}>All: {projects.length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Ongoing")}>In Progress: {projects.filter(project => project.status === 'Ongoing').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Completed")}>Completed: {projects.filter(project => project.status === 'Completed').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Cancelled")}>Cancelled: {projects.filter(project => project.status === 'Cancelled').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Ended")}>Ended: {projects.filter(project => new Date(project.endDate) < new Date() || project.status === 'Ended').length}</button>
//         </div>

//         <div className="employee_details">
//           <div className="srh-container">
//             <div className="search">
//               <span className="material-symbols-outlined">search</span>
//               <input
//                 type="text"
//                 placeholder="Enter project title..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <button className="add-project-btn" onClick={handleAddProject}>
//               <span className="material-symbols-outlined">add</span>
//               Add Project
//             </button>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Project Title</th>
//                 <th>Project Description</th>
//                 <th>Status</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.id}>
//                   <td>{project.title}</td>
//                   <td>{project.description}</td>
//                   <td>
//                     <select value={project.status} onChange={(e) =>  handleStatusChange(project.id, e.target.value)}>
//                       <option value="Ongoing">Ongoing</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Pending">Pending</option>
//                     </select>
//                   </td>
//                   <td>{project.startDate}</td>
//                   <td>{project.endDate}</td>
//                   <td>
//                     <button className="open-btn" onClick={() => handleOpenProject(project.id)}>Open</button>
//                     <button className="delete-btn" onClick={() => handleDelete(project.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Empproject;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";
// import logo from '../Images/logo.png';
// import "./Empproject.css";

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

// const Empproject = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectCollection = collection(db, "project");
//         const snapshot = await getDocs(projectCollection);
//         const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setProjects(data);
//         setFilteredProjects(data); // Initially, set filteredProjects to all projects
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleOpenProject = (projectId) => {
//     navigate(`/OpenProject/${projectId}`);
//   };

//   const filterProjects = (status) => {
//     if (status === "All") {
//       return projects;
//     } else {
//       return projects.filter(project => project.status === status);
//     }
//   };

//   const handleFilterClick = (status) => {
//     setFilter(status);
//     if (status === "All") {
//       setFilteredProjects(projects); // Set filteredProjects to all projects
//     } else {
//       const filtered = projects.filter(project => project.status === status);
//       setFilteredProjects(filtered);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     const filtered = projects.filter(project =>
//       project.title.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   return (
//     <div className="container">
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/EmpAttendance")} />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Leave" icon="paid" onSelect={() => navigate("/Empleave")} />
//           <NavItem itemName="Log out" icon="logout" onSelect={() => {
//             const confirmed = window.confirm("Are you sure you want to log out?");
//             if (confirmed) navigate("/");
//           }} />
//         </div>
//       </aside>

//       <main>
//         <h1 id="employee1">Projects</h1>

//         <div className="project-stats">
//           <button className="stat-btn" onClick={() => handleFilterClick("All")}>All: {projects.length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Ongoing")}>In Progress: {projects.filter(project => project.status === 'Ongoing').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Completed")}>Completed: {projects.filter(project => project.status === 'Completed').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Cancelled")}>Cancelled: {projects.filter(project => project.status === 'Cancelled').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Ended")}>Ended: {projects.filter(project => new Date(project.endDate) < new Date() || project.status === 'Ended').length}</button>
//         </div>

//         <div className="employee_details">
//           <div className="srh-container">
//             <div className="search">
//               <span className="material-symbols-outlined">search</span>
//               <input
//                 type="text"
//                 placeholder="Enter project title..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Project Title</th>
//                 <th>Project Description</th>
//                 <th>Status</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.id}>
//                   <td>{project.title}</td>
//                   <td>{project.description}</td>
//                   <td>{project.status}</td>
//                   <td>{project.startDate}</td>
//                   <td>{project.endDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Empproject;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import logo from '../Images/logo.png';
// import "./Empproject.css";

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

// const Empproject = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [currentUserEmail, setCurrentUserEmail] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userEmail = user.email;
//         setCurrentUserEmail(userEmail);
//         console.log("Logged in user email:", userEmail);

//         try {
//           const projectCollection = collection(db, "project");
//           const q = query(
//             projectCollection,
//             where("member1Email", "==", userEmail)
//           );

//           const q2 = query(
//             projectCollection,
//             where("member2Email", "==", userEmail)
//           );

//           const snapshot = await getDocs(q);
//           const snapshot2 = await getDocs(q2);

//           const data = snapshot.docs.concat(snapshot2.docs).map(doc => ({ id: doc.id, ...doc.data() }));
//           console.log("Fetched projects data:", data);

//           setProjects(data);
//           setFilteredProjects(data);
//         } catch (error) {
//           console.error("Error fetching projects:", error);
//         }
//       } else {
//         setCurrentUserEmail("");
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleOpenProject = (projectId) => {
//     navigate(`/OpenProject/${projectId}`);
//   };

//   const handleFilterClick = (status) => {
//     setFilter(status);
//     if (status === "All") {
//       setFilteredProjects(projects);
//     } else {
//       const filtered = projects.filter(project => project.status === status);
//       setFilteredProjects(filtered);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     const filtered = projects.filter(project =>
//       project.title.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   return (
//     <div className="container">
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/EmpAttendance")} />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Leave" icon="paid" onSelect={() => navigate("/Empleave")} />
//           <NavItem itemName="Log out" icon="logout" onSelect={() => {
//             const confirmed = window.confirm("Are you sure you want to log out?");
//             if (confirmed) navigate("/");
//           }} />
//         </div>
//       </aside>

//       <main>
//         <h1 id="employee1">Projects</h1>

//         <div className="project-stats">
//           <button className="stat-btn" onClick={() => handleFilterClick("All")}>All: {projects.length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Ongoing")}>In Progress: {projects.filter(project => project.status === 'Ongoing').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Completed")}>Completed: {projects.filter(project => project.status === 'Completed').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Cancelled")}>Cancelled: {projects.filter(project => project.status === 'Cancelled').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Ended")}>Ended: {projects.filter(project => new Date(project.endDate) < new Date() || project.status === 'Ended').length}</button>
//         </div>

//         <div className="employee_details">
//           <div className="srh-container">
//             <div className="search">
//               <span className="material-symbols-outlined">search</span>
//               <input
//                 type="text"
//                 placeholder="Enter project title..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Project Title</th>
//                 <th>Project Description</th>
//                 <th>Status</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.id} onClick={() => handleOpenProject(project.id)}>
//                   <td>{project.title}</td>
//                   <td>{project.description}</td>
//                   <td>{project.status}</td>
//                   <td>{project.startDate}</td>
//                   <td>{project.endDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Empproject;





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import logo from '../Images/logo.png';
// import "./Empproject.css";

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

// const Empproject = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [currentUserEmail, setCurrentUserEmail] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userEmail = user.email;
//         setCurrentUserEmail(userEmail);
//         console.log("Logged in user email:", userEmail);

//         try {
//           const projectCollection = collection(db, "project");
//           const snapshot = await getDocs(projectCollection);

//           const data = snapshot.docs
//             .map(doc => ({ id: doc.id, ...doc.data() }))
//             .filter(project => {
//               const memberEmails = Object.keys(project).filter(key => key.startsWith("member") && key.endsWith("Email"));
//               return memberEmails.some(key => project[key].toLowerCase() === userEmail.toLowerCase());
//             });

//           console.log("Fetched projects data:", data);

//           setProjects(data);
//           setFilteredProjects(data);
//         } catch (error) {
//           console.error("Error fetching projects:", error);
//         }
//       } else {
//         setCurrentUserEmail("");
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleOpenProject = (projectId) => {
//     navigate(`/OpenProject/${projectId}`);
//   };

//   const handleFilterClick = (status) => {
//     setFilter(status);
//     if (status === "All") {
//       setFilteredProjects(projects);
//     } else {
//       const filtered = projects.filter(project => project.status === status);
//       setFilteredProjects(filtered);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     const filtered = projects.filter(project =>
//       project.title.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   return (
//     <div className="container">
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/EmpAttendance")} />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Leave" icon="paid" onSelect={() => navigate("/Empleave")} />
//           <NavItem itemName="Log out" icon="logout" onSelect={() => {
//             const confirmed = window.confirm("Are you sure you want to log out?");
//             if (confirmed) navigate("/");
//           }} />
//         </div>
//       </aside>

//       <main>
//         <h1 id="employee1">Projects</h1>

//         <div className="project-stats">
//           <button className="stat-btn" onClick={() => handleFilterClick("All")}>All: {projects.length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Ongoing")}>In Progress: {projects.filter(project => project.status === 'Ongoing').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Completed")}>Completed: {projects.filter(project => project.status === 'Completed').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Cancelled")}>Cancelled: {projects.filter(project => project.status === 'Cancelled').length}</button>
//           <button className="stat-btn" onClick={() => handleFilterClick("Ended")}>Ended: {projects.filter(project => new Date(project.endDate) < new Date() || project.status === 'Ended').length}</button>
//         </div>

//         <div className="employee_details">
//           <div className="srh-container">
//             <div className="search">
//               <span className="material-symbols-outlined">search</span>
//               <input
//                 type="text"
//                 placeholder="Enter project title..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Project Title</th>
//                 <th>Project Description</th>
//                 <th>Status</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.id} onClick={() => handleOpenProject(project.id)}>
//                   <td>{project.title}</td>
//                   <td>{project.description}</td>
//                   <td>{project.status}</td>
//                   <td>{project.startDate}</td>
//                   <td>{project.endDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Empproject;








import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from '../Images/logo.png';
import "./Empproject.css";

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

const Empproject = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setCurrentUserEmail(userEmail);
        console.log("Logged in user email:", userEmail);

        try {
          const projectCollection = collection(db, "project");
          const snapshot = await getDocs(projectCollection);

          const data = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(project => {
              const memberEmails = Object.keys(project).filter(key => key.startsWith("member") && key.endsWith("Email"));
              return memberEmails.some(key => project[key].toLowerCase() === userEmail.toLowerCase());
            });

          console.log("Fetched projects data:", data);

          setProjects(data);
          setFilteredProjects(data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      } else {
        setCurrentUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenProject = (projectId) => {
    navigate(`/EmpOpenProject/${projectId}`);
  };

  const handleFilterClick = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.status === status);
      setFilteredProjects(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProjects(filtered);
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
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/EmpAttendance")} />
          <NavItem itemName="Projects" icon="model_training" selected={true} />
          <NavItem itemName="Leave" icon="paid" onSelect={() => navigate("/Empleave")} />
          <NavItem itemName="Log out" icon="logout" onSelect={() => {
            const confirmed = window.confirm("Are you sure you want to log out?");
            if (confirmed) navigate("/");
          }} />
        </div>
      </aside>

      <main>
        <h1 id="employee1">Projects</h1>

        <div className="project-stats">
          <button className="stat-btn" onClick={() => handleFilterClick("All")}>All: {projects.length}</button>
          <button className="stat-btn" onClick={() => handleFilterClick("Ongoing")}>In Progress: {projects.filter(project => project.status === 'Ongoing').length}</button>
          <button className="stat-btn" onClick={() => handleFilterClick("Completed")}>Completed: {projects.filter(project => project.status === 'Completed').length}</button>
          <button className="stat-btn" onClick={() => handleFilterClick("Pending")}>Pending: {projects.filter(project => project.status === 'Pending').length}</button>
        </div>

        <div className="employee_details">
          <div className="srh-container">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Enter project title..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Project Description</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td><button onClick={() => handleOpenProject(project.id)}>Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Empproject;
