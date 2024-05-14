// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";
// import { signOut } from "firebase/auth";
// import logo from "../Images/logo.png";
// import "./OpenProject.css";

// const NavItem = ({ itemName, icon, selected, onSelect }) => {
//   return (
//     <a
//       href="#"
//       className={selected ? "active" : ""}
//       onClick={(e) => {
//         e.preventDefault(); // Prevent default anchor behavior
//         onSelect();
//       }}
//     >
//       <span className="material-symbols-outlined">{icon}</span>
//       <h3>{itemName}</h3>
//     </a>
//   );
// };

// const OpenProject = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   // State variables to hold project details
//   const [clientName, setClientName] = useState("");
//   const [projectStatus, setProjectStatus] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [teamMembers, setTeamMembers] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [workProgress, setWorkProgress] = useState([]);

//   // Simulated fetch project details function
//   const fetchProjectDetails = () => {
//     // Replace this with actual API call to fetch project details
//     // For demonstration, a static project object is used
//     const staticProjectData = {
//       id: 1,
//       title: "Project A",
//       clientName: "Client 1",
//       status: "Ongoing",
//       startDate: "2024-01-15",
//       endDate: "2024-07-30",
//       assignedTo: "Team Alpha",
//     };
//     setClientName(staticProjectData.clientName);
//     setProjectStatus(staticProjectData.status);
//     setStartDate(staticProjectData.startDate);
//     setEndDate(staticProjectData.endDate);
//   };

//   useEffect(() => {
//     fetchProjectDetails();
//   }, []);

//   const handleBack = () => {
//     navigate("/Project");
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => navigate("/"))
//         .catch((error) => console.error("Error signing out:", error));
//     }
//   };

//   // Function to handle submitting work progress
//   const handleSubmitWorkProgress = (e) => {
//     e.preventDefault();
//     // Get values from form fields and update the workProgress state
//     const employeeName = e.target.elements.employeeName.value;
//     const submittedOn = e.target.elements.submittedOn.value;
//     const time = e.target.elements.time.value;
//     const description = e.target.elements.description.value;
//     const comments = e.target.elements.comments.value;

//     // Add the new work progress to the existing state
//     setWorkProgress([
//       ...workProgress,
//       {
//         employeeName,
//         submittedOn,
//         time,
//         description,
//         comments,
//       },
//     ]);

//     // Clear the form fields after submission
//     e.target.reset();
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Dashboard")} />
//           <NavItem itemName="Admins" icon="diversity_3" selected={true} onSelect={() => navigate("/Admin")} />
//           <NavItem itemName="Employees" icon="badge" onSelect={() => navigate("/Employee")} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/Attendance")} />
//           <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={() => navigate("/Leave")} />
//         </div>
//       </aside>

//       {/* Main content */}
//       <main>
//         <h1>Project Details</h1>

//         <div className="About-Project">
//           <div className="form-group">
//             <label htmlFor="clientName">Client Name:</label>
//             <input type="text" id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectStatus">Project Status:</label>
//             <select id="projectStatus" value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectDescription">Project Description:</label>
//             <textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="teamMembers">Team Members:</label>
//             <input type="text" id="teamMembers" value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date:</label>
//             <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date:</label>
//             <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//           </div>
//           {/* Work Progress Section */}
//           <div className="work-progress-section">
//             <h1>Work Progress</h1>
//             {workProgress.map((progress, index) => (
//               <div key={index} className="work-progress-item">
//                 <p>Employee Name: {progress.employeeName}</p>
//                 <p>Submitted On: {progress.submittedOn}</p>
//                 <p>Time: {progress.time}</p>
//                 <p>Description: {progress.description}</p>
//                 <p>Comments: {progress.comments}</p>
//               </div>
//             ))}
//             <form onSubmit={handleSubmitWorkProgress}>
//               <div className="form-group">
//                 <label htmlFor="employeeName">Employee Name:</label>
//                 <input type="text" id="employeeName" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="submittedOn">Submitted On:</label>
//                 <input type="date" id="submittedOn" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="time">Time:</label>
//                 <input type="time" id="time" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description:</label>
//                 <textarea id="description" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="comments">Comments:</label>
//                 <input type="text" id="comments" />
//               </div>
//               <button className="submit" type="submit">Submit Work Progress</button>
//             </form>
//           </div>
//         </div>

//         <button className="back-btn" onClick={handleBack}>Back to Projects</button>
//       </main>
//     </div>
//   );
// };

// export default OpenProject;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { signOut } from "firebase/auth";
// import logo from "../Images/logo.png";
// import "./OpenProject.css";

// const NavItem = ({ itemName, icon, selected, onSelect }) => (
//   <a
//     href="#"
//     className={selected ? "active" : ""}
//     onClick={(e) => {
//       e.preventDefault(); // Prevent default anchor behavior
//       onSelect();
//     }}
//   >
//     <span className="material-symbols-outlined">{icon}</span>
//     <h3>{itemName}</h3>
//   </a>
// );

// const OpenProject = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const [projectDescription, setProjectDescription] = useState("");
//   const [projectStatus, setProjectStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [workProgress, setWorkProgress] = useState([]);

//   const fetchProjectDetails = async () => {
//     try {
//       const projectDoc = await getDoc(doc(db, "project", projectId));
//       if (projectDoc.exists()) {
//         const projectData = projectDoc.data();
//         setProjectDescription(projectData.description);
//         setProjectStatus(projectData.status);
//         setStartDate(projectData.startDate);
//         setEndDate(projectData.endDate);
//       } else {
//         console.error("No such project!");
//       }
//     } catch (error) {
//       console.error("Error fetching project details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProjectDetails();
//   }, [projectId]);

//   const handleBack = () => {
//     navigate("/Project");
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => navigate("/"))
//         .catch((error) => console.error("Error signing out:", error));
//     }
//   };

//   const handleSubmitWorkProgress = (e) => {
//     e.preventDefault();
//     const employeeName = e.target.elements.employeeName.value;
//     const submittedOn = e.target.elements.submittedOn.value;
//     const time = e.target.elements.time.value;
//     const description = e.target.elements.description.value;
//     const comments = e.target.elements.comments.value;

//     setWorkProgress([
//       ...workProgress,
//       {
//         employeeName,
//         submittedOn,
//         time,
//         description,
//         comments,
//       },
//     ]);

//     e.target.reset();
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const projectRef = doc(db, "project", projectId);
//       await updateDoc(projectRef, { status: newStatus });
//       setProjectStatus(newStatus);
//     } catch (error) {
//       console.error("Error updating project status:", error);
//     }
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
//           <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={() => navigate("/Leave")} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       <main>
//         <h1>Project Details</h1>

//         <div className="About-Project">
//           <div className="form-group">
//             <label htmlFor="projectDescription">Project Description:</label>
//             <textarea
//               id="projectDescription"
//               value={projectDescription}
//               onChange={(e) => setProjectDescription(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectStatus">Project Status:</label>
//             <select
//               id="projectStatus"
//               value={projectStatus}
//               onChange={(e) => handleStatusChange(e.target.value)}
//             >
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date:</label>
//             <input
//               type="date"
//               id="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date:</label>
//             <input
//               type="date"
//               id="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>

//           <div className="work-progress-section">
//             <h1>Work Progress</h1>
//             {workProgress.map((progress, index) => (
//               <div key={index} className="work-progress-item">
//                 <p>Employee Name: {progress.employeeName}</p>
//                 <p>Submitted On: {progress.submittedOn}</p>
//                 <p>Time: {progress.time}</p>
//                 <p>Description: {progress.description}</p>
//                 <p>Comments: {progress.comments}</p>
//               </div>
//             ))}
//             <form onSubmit={handleSubmitWorkProgress}>
//               <div className="form-group">
//                 <label htmlFor="employeeName">Employee Name:</label>
//                 <input type="text" id="employeeName" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="submittedOn">Submitted On:</label>
//                 <input type="date" id="submittedOn" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="time">Time:</label>
//                 <input type="time" id="time" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description:</label>
//                 <textarea id="description" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="comments">Comments:</label>
//                 <input type="text" id="comments" />
//               </div>
//               <button className="submit" type="submit">Submit Work Progress</button>
//             </form>
//           </div>
//         </div>

//         <button className="back-btn" onClick={handleBack}>Back to Projects</button>
//       </main>
//     </div>
//   );
// };

// export default OpenProject;




// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { signOut } from "firebase/auth";
// import logo from "../Images/logo.png";
// import "./OpenProject.css";

// const NavItem = ({ itemName, icon, selected, onSelect }) => (
//   <a
//     href="#"
//     className={selected ? "active" : ""}
//     onClick={(e) => {
//       e.preventDefault(); // Prevent default anchor behavior
//       onSelect();
//     }}
//   >
//     <span className="material-symbols-outlined">{icon}</span>
//     <h3>{itemName}</h3>
//   </a>
// );

// const OpenProject = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const [projectTitle, setProjectTitle] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [projectStatus, setProjectStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [workProgress, setWorkProgress] = useState([]);
//   const [members, setMembers] = useState([]);

//   const fetchProjectDetails = async () => {
//     try {
//       const projectDoc = await getDoc(doc(db, "project", projectId));
//       if (projectDoc.exists()) {
//         const projectData = projectDoc.data();
//         setProjectTitle(projectData.title);
//         setProjectDescription(projectData.description);
//         setProjectStatus(projectData.status);
//         setStartDate(projectData.startDate);
//         setEndDate(projectData.endDate);
//         setMembers(projectData.members || []);
//       } else {
//         console.error("No such project!");
//       }
//     } catch (error) {
//       console.error("Error fetching project details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProjectDetails();
//   }, [projectId]);

//   const handleBack = () => {
//     navigate("/Project");
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => navigate("/"))
//         .catch((error) => console.error("Error signing out:", error));
//     }
//   };

//   const handleSubmitWorkProgress = (e) => {
//     e.preventDefault();
//     const employeeName = e.target.elements.employeeName.value;
//     const submittedOn = e.target.elements.submittedOn.value;
//     const time = e.target.elements.time.value;
//     const description = e.target.elements.description.value;
//     const comments = e.target.elements.comments.value;

//     setWorkProgress([
//       ...workProgress,
//       {
//         employeeName,
//         submittedOn,
//         time,
//         description,
//         comments,
//       },
//     ]);

//     e.target.reset();
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const projectRef = doc(db, "project", projectId);
//       await updateDoc(projectRef, { status: newStatus });
//       setProjectStatus(newStatus);
//     } catch (error) {
//       console.error("Error updating project status:", error);
//     }
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
//           <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={() => navigate("/Leave")} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       <main>
//         <h1>Project Details</h1>

//         <div className="About-Project">
//           <div className="form-group">
//             <label htmlFor="projectTitle">Project Title:</label>
//             <input
//               type="text"
//               id="projectTitle"
//               value={projectTitle}
//               onChange={(e) => setProjectTitle(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectDescription">Project Description:</label>
//             <textarea
//               id="projectDescription"
//               value={projectDescription}
//               onChange={(e) => setProjectDescription(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectStatus">Project Status:</label>
//             <select
//               id="projectStatus"
//               value={projectStatus}
//               onChange={(e) => handleStatusChange(e.target.value)}
//             >
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date:</label>
//             <input
//               type="date"
//               id="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date:</label>
//             <input
//               type="date"
//               id="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <h2>Assigned Members</h2>
//             <ul>
//               {members.map((member, index) => (
//                 <li key={index}>{member.name} ({member.email})</li>
//               ))}
//             </ul>
//           </div>

//           <div className="work-progress-section">
//             <h1>Work Progress</h1>
//             {workProgress.map((progress, index) => (
//               <div key={index} className="work-progress-item">
//                 <p>Employee Name: {progress.employeeName}</p>
//                 <p>Submitted On: {progress.submittedOn}</p>
//                 <p>Time: {progress.time}</p>
//                 <p>Description: {progress.description}</p>
//                 <p>Comments: {progress.comments}</p>
//               </div>
//             ))}
//             <form onSubmit={handleSubmitWorkProgress}>
//               <div className="form-group">
//                 <label htmlFor="employeeName">Employee Name:</label>
//                 <input type="text" id="employeeName" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="submittedOn">Submitted On:</label>
//                 <input type="date" id="submittedOn" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="time">Time:</label>
//                 <input type="time" id="time" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description:</label>
//                 <textarea id="description" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="comments">Comments:</label>
//                 <input type="text" id="comments" />
//               </div>
//               <button className="submit" type="submit">Submit Work Progress</button>
//             </form>
//           </div>
//         </div>

//         <button className="back-btn" onClick={handleBack}>Back to Projects</button>
//       </main>
//     </div>
//   );
// };

// export default OpenProject;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import logo from "../Images/logo.png";
import "./OpenProject.css";

const NavItem = ({ itemName, icon, selected, onSelect }) => (
  <a
    href="#"
    className={selected ? "active" : ""}
    onClick={(e) => {
      e.preventDefault();
      onSelect();
    }}
  >
    <span className="material-symbols-outlined">{icon}</span>
    <h3>{itemName}</h3>
  </a>
);

const OpenProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

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
        setProjectTitle(projectData.title);
        setProjectDescription(projectData.description);
        setProjectStatus(projectData.status);
        setStartDate(projectData.startDate);
        setEndDate(projectData.endDate);
        setMembers(projectData.members || []);
      } else {
        console.error("No such project!");
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const fetchMemberWorkProgress = async (memberEmail) => {
    try {
      const workProgressDoc = await getDoc(doc(db, "workProgress", memberEmail + "_" + projectId));
      if (workProgressDoc.exists()) {
        setWorkDescription(workProgressDoc.data().description);
      } else {
        setWorkDescription("");
      }
    } catch (error) {
      console.error("Error fetching member work progress:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    if (selectedMember) {
      fetchMemberWorkProgress(selectedMember);
    }
  }, [selectedMember]);

  const handleBack = () => {
    navigate("/Project");
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error signing out:", error));
    }
  };

  const handleSubmitWorkProgress = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "workProgress", selectedMember + "_" + projectId), {
        description: workDescription,
      });
      alert("Work progress updated successfully");
    } catch (error) {
      console.error("Error updating work progress:", error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const projectRef = doc(db, "project", projectId);
      await updateDoc(projectRef, { status: newStatus });
      setProjectStatus(newStatus);
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
          <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={() => navigate("/Leave")} />
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
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Project Description:</label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectStatus">Project Status:</label>
            <select
              id="projectStatus"
              value={projectStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <h2>Assigned Members</h2>
            <select
              id="assignedMembers"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">Select a member</option>
              {members.map((member, index) => (
                <option key={index} value={member.email}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>
          </div>

          <div className="work-progress-section">
            <h1>Work Progress</h1>
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

        <button className="back-btn" onClick={handleBack}>Back to Projects</button>
      </main>
    </div>
  );
};

export default OpenProject;
