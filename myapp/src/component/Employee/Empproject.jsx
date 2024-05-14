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





import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
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
  const { projectId } = useParams();

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [workProgress, setWorkProgress] = useState([]);
  const [workDescription, setWorkDescription] = useState("");

  const fetchProjectDetails = async () => {
    try {
      const projectDoc = await getDoc(doc(db, "project", projectId));
      if (projectDoc.exists()) {
        const projectData = projectDoc.data();
        console.log("Project data:", projectData); // Debugging
        if (projectData) {
          setProjectTitle(projectData.title || "");
          setProjectDescription(projectData.description || "");
          setProjectStatus(projectData.status || "");
          setStartDate(projectData.startDate || "");
          setEndDate(projectData.endDate || "");
          setMembers(projectData.members || []);
        } else {
          console.error("Project data is undefined");
        }
      } else {
        console.error("No such project!");
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const fetchMemberWorkProgress = async (memberEmail) => {
    try {
      const projectDoc = await getDoc(doc(db, "project", projectId));
      if (projectDoc.exists()) {
        const projectData = projectDoc.data();
        const memberData = (projectData.members || []).find(
          (member) => member.email === memberEmail
        );
        setWorkProgress(memberData?.workProgress || []); // Handle case when workProgress is not present
      }
    } catch (error) {
      console.error("Error fetching member work progress:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching project details...");
    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    if (selectedMember) {
      fetchMemberWorkProgress(selectedMember);
    }
  }, [selectedMember]);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      navigate("/");
    }
  };

  const handleSubmitWorkProgress = async (e) => {
    e.preventDefault();
    try {
      const memberEmail = selectedMember;
      const projectDocRef = doc(db, "project", projectId);
      const memberIndex = members.findIndex(member => member.email === memberEmail);

      console.log("Selected Member:", memberEmail);
      console.log("Work Description:", workDescription);

      if (memberIndex !== -1) {
        await updateDoc(projectDocRef, {
          [`members.${memberIndex}.workProgress`]: arrayUnion({ description: workDescription }),
        });

        alert("Work progress updated successfully");
      } else {
        alert(`Member with email ${memberEmail} not found in the project.`);
      }
    } catch (error) {
      console.error("Error updating work progress:", error.message);
      alert(`Error updating work progress: ${error.message}`);
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
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/Attendance")} />
          <NavItem itemName="Projects" icon="model_training" onSelect={() => navigate("/Projects")} />
          <NavItem itemName="Leave" icon="paid" onSelect={() => navigate("/Leave")} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      <main>
        <h1>Project Details</h1>

        <div className="About-Project">
          <div className="form-group">
            <label htmlFor="projectTitle">Project Title:</label>
            <input
              type="text"
              id="projectTitle"
              value={projectTitle || "book management"}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Project Description:</label>
            <textarea
              id="projectDescription"
              value={projectDescription || "Must be made a book management system"}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectStatus">Project Status:</label>
            <input
              type="text"
              id="projectStatus"
              value={projectStatus || "Pending"}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate || "2024-05-15"}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate || "2024-06-04"}
              readOnly
            />
          </div>

          

          <div className="work-progress-section">
            <h1>Work Progress</h1>
            {workProgress.map((progress, index) => (
              <div key={index}>
                <p>{progress.description}</p>
              </div>
            ))}
            <form onSubmit={handleSubmitWorkProgress}>
              <div className="form-group">
                <label htmlFor="workDescription">Work Description:</label>
                <textarea
                  id="workDescription"
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
                />
              </div>
              <button className="submit" type="submit">Submit Work Progress</button>
            </form>
          </div>
        </div>

        <button className="back-btn" onClick={() => navigate("/Projects")}>Back to Projects</button>
      </main>
    </div>
  );
};

export default Empproject;
