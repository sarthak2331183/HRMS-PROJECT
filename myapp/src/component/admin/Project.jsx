// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import logo from '../Images/logo.png';
// import "./Project.css";

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

// const Project = () => {
//   const navigate = useNavigate();

//   const handleAddProject = () => {
//     navigate('/AddProject');
//   };

//   const handleOpenProject = (projectId) => {
//     navigate(`/OpenProject/${projectId}`);
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

//   const openDashboard = () => navigate("/Dashboard");
//   const openEmployee = () => navigate("/Employee");
//   const openAdmin = () => navigate("/Admin");
//   const openAttendance = () => navigate("/Attendance");
//   const openLeave = () => navigate("/Leave");

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
//           <NavItem itemName="Employees" icon="badge" onSelect={openEmployee} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={openAttendance} />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Leave" icon="Prompt_suggestion" onSelect={openLeave} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       {/* Main content */}
//       <main>
//         <h1 id="employee">Project</h1>

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
//               Add Project
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
//                       className="open-btn"
//                       onClick={() => handleOpenProject(project.id)}
//                     >
//                       Open
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(project.id)}
//                     >
//                       Delete
//                     </button>
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

// export default Project;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Dashboard.css";
import logo from '../Images/logo.png';
import "./Project.css";

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

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectCollection = collection(db, "project");
        const snapshot = await getDocs(projectCollection);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = () => {
    navigate('/AddProject');
  };

  const handleOpenProject = (projectId) => {
    navigate(`/OpenProject/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "project", projectId));
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const projectRef = doc(db, "project", projectId);
      await updateDoc(projectRef, { status: newStatus });
      setProjects((prevProjects) => prevProjects.map((p) => p.id === projectId ? { ...p, status: newStatus } : p));
    } catch (error) {
      console.error("Error updating project status:", error);
    }
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
          <NavItem itemName="Employees" icon="badge" onSelect={() => navigate("/Employee")} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/Attendance")} />
          <NavItem itemName="Projects" icon="model_training" selected={true} />
          <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={() => navigate("/Leave")} />
          <NavItem itemName="Log out" icon="logout" onSelect={() => {
            const confirmed = window.confirm("Are you sure you want to log out?");
            if (confirmed) navigate("/");
          }} />
        </div>
      </aside>

      <main>
        <h1 id="employee">Project</h1>

        <div className="project-stats">
          <button className="stat-btn">Upcoming: {projects.filter(project => new Date(project.startDate) > new Date()).length}</button>
          <button className="stat-btn">In Progress: {projects.filter(project => project.status === 'Ongoing').length}</button>
          <button className="stat-btn">Completed: {projects.filter(project => project.status === 'Completed').length}</button>
          <button className="stat-btn">Cancelled: {projects.filter(project => project.status === 'Cancelled').length}</button>
          <button className="stat-btn">Ended: {projects.filter(project => new Date(project.endDate) < new Date() || project.status === 'Ended').length}</button>
        </div>

        <div className="employee_details">
          <div className="srh-container">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Enter project title..." />
            </div>
            <button className="add-project-btn" onClick={handleAddProject}>
              <span className="material-symbols-outlined">add</span>
              Add Project
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Project Description</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>
                    <select value={project.status} onChange={(e) => handleStatusChange(project.id, e.target.value)}>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>
                    <button className="open-btn" onClick={() => handleOpenProject(project.id)}>Open</button>
                    <button className="delete-btn" onClick={() => handleDelete(project.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Project;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";
// import "./Dashboard.css";
// import logo from '../Images/logo.png';
// import "./Project.css";

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

// const Project = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [statusMessage, setStatusMessage] = useState("");

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectCollection = collection(db, "project");
//         const snapshot = await getDocs(projectCollection);
//         const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setProjects(data);
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
//         setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
//       } catch (error) {
//         console.error("Error deleting project:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (projectId, newStatus) => {
//     try {
//       const projectRef = doc(db, "projects", projectId);
//       await updateDoc(projectRef, { status: newStatus });
//       setProjects((prevProjects) => prevProjects.map((p) => p.id === projectId ? { ...p, status: newStatus } : p));
//       setStatusMessage("Status updated");
//       setTimeout(() => setStatusMessage(""), 3000);  // Hide message after 3 seconds
//     } catch (error) {
//       console.error("Error updating project status:", error);
//     }
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       navigate("/");
//     }
//   };

//   const openDashboard = () => navigate("/Dashboard");
//   const openEmployee = () => navigate("/Employee");
//   const openAdmin = () => navigate("/Admin");
//   const openAttendance = () => navigate("/Attendance");
//   const openLeave = () => navigate("/Leave");

//   const pendingProjects = projects.filter((project) => project.status === 'Pending');
//   const inProgressProjects = projects.filter((project) => project.status === 'In Progress');
//   const completedProjects = projects.filter((project) => project.status === 'Completed');

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
//           <NavItem itemName="Employees" icon="badge" onSelect={openEmployee} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={openAttendance} />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Leave" icon="Prompt_suggestion" onSelect={openLeave} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       {/* Main content */}
//       <main>
//         <h1 id="employee">Project</h1>

//         {/* Project statistics */}
//         <div className="project-stats">
//           <button className="stat-btn">Total: {projects.length}</button>
//           <button className="stat-btn">Pending: {pendingProjects.length}</button>
//           <button className="stat-btn">In Progress: {inProgressProjects.length}</button>
//           <button className="stat-btn">Completed: {completedProjects.length}</button>
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
//               Add Project
//             </button>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Project Title</th>
//                 <th>Description</th>
//                 <th>Status</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project) => (
//                 <tr key={project.id}>
//                   <td>{project.title}</td>
//                   <td>{project.description}</td>
//                   <td>
//                     <div className="status-dropdown">
//                       <button className="status-btn" onClick={(e) => e.currentTarget.nextSibling.classList.toggle("show")}>
//                         {project.status}
//                       </button>
//                       <div className="status-options">
//                         {['Pending', 'In Progress', 'Completed'].map(status => (
//                           status !== project.status && (
//                             <button key={status} className="status-option" onClick={() => handleStatusChange(project.id, status)}>
//                               {status}
//                             </button>
//                           )
//                         ))}
//                       </div>
//                     </div>
//                     {statusMessage && <p className="status-message">{statusMessage}</p>}
//                   </td>
//                   <td>{project.startDate}</td>
//                   <td>{project.endDate}</td>
//                   <td>
//                     <button
//                       className="open-btn"
//                       onClick={() => handleOpenProject(project.id)}
//                     >
//                       Open
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(project.id)}
//                     >
//                       Delete
//                     </button>
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

// export default Project;




