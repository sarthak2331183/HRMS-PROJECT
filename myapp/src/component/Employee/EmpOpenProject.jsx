// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { signOut } from "firebase/auth";
// import logo from "../Images/logo.png";


// const EmpOpenProject = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const [projectTitle, setProjectTitle] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [projectStatus, setProjectStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [workDescription, setWorkDescription] = useState("");

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const projectDoc = await getDoc(doc(db, "project", projectId));
//         if (projectDoc.exists()) {
//           const projectData = projectDoc.data();
//           setProjectTitle(projectData.title);
//           setProjectDescription(projectData.description);
//           setProjectStatus(projectData.status);
//           setStartDate(projectData.startDate);
//           setEndDate(projectData.endDate);
//         } else {
//           console.error("No such project!");
//         }
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       }
//     };

//     fetchProjectDetails();
//   }, [projectId]);

//   const handleBack = () => {
//     navigate("/Empproject");
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => navigate("/"))
//         .catch((error) => console.error("Error signing out:", error));
//     }
//   };

//   const handleSubmitWorkProgress = async (e) => {
//     e.preventDefault();
//     try {
//       await updateDoc(doc(db, "workProgress", auth.currentUser.email + "_" + projectId), {
//         description: workDescription,
//       });
//       alert("Work progress updated successfully");
//     } catch (error) {
//       console.error("Error updating work progress:", error);
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
//           <a href="#" onClick={handleLogout}>
//             <span className="material-symbols-outlined">logout</span>
//             <h3>Log out</h3>
//           </a>
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
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectDescription">Project Description:</label>
//             <textarea
//               id="projectDescription"
//               value={projectDescription}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectStatus">Project Status:</label>
//             <input
//               type="text"
//               id="projectStatus"
//               value={projectStatus}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date:</label>
//             <input
//               type="text"
//               id="startDate"
//               value={startDate}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date:</label>
//             <input
//               type="text"
//               id="endDate"
//               value={endDate}
//               readOnly
//             />
//           </div>

//           <div className="work-progress-section">
//             <h1>Work Progress</h1>
//             <form onSubmit={handleSubmitWorkProgress}>
//               <div className="form-group">
//                 <label htmlFor="workDescription">Work Description:</label>
//                 <textarea
//                   id="workDescription"
//                   value={workDescription}
//                   onChange={(e) => setWorkDescription(e.target.value)}
//                 />
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

// export default EmpOpenProject;





// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { signOut } from "firebase/auth";
// import logo from "../Images/logo.png";

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

// const EmpOpenProject = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const [projectTitle, setProjectTitle] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [projectStatus, setProjectStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [workDescription, setWorkDescription] = useState("");

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const projectDoc = await getDoc(doc(db, "project", projectId));
//         if (projectDoc.exists()) {
//           const projectData = projectDoc.data();
//           setProjectTitle(projectData.title);
//           setProjectDescription(projectData.description);
//           setProjectStatus(projectData.status);
//           setStartDate(projectData.startDate);
//           setEndDate(projectData.endDate);
//         } else {
//           console.error("No such project!");
//         }
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       }
//     };

//     fetchProjectDetails();
//   }, [projectId]);

//   const handleBack = () => {
//     navigate("/Empproject");
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => navigate("/"))
//         .catch((error) => console.error("Error signing out:", error));
//     }
//   };

//   const handleSubmitWorkProgress = async (e) => {
//     e.preventDefault();
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userEmail = user.email;
//         const projectRef = doc(db, "project", projectId);

//         await updateDoc(projectRef, {
//           [`workProgress.${userEmail}`]: workDescription,
//         });

//         alert("Work progress updated successfully");
//         // Clear the workDescription state after submission
//         setWorkDescription("");
//       }
//     } catch (error) {
//       console.error("Error updating work progress:", error);
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
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
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectDescription">Project Description:</label>
//             <textarea
//               id="projectDescription"
//               value={projectDescription}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectStatus">Project Status:</label>
//             <input
//               type="text"
//               id="projectStatus"
//               value={projectStatus}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date:</label>
//             <input
//               type="text"
//               id="startDate"
//               value={startDate}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date:</label>
//             <input
//               type="text"
//               id="endDate"
//               value={endDate}
//               readOnly
//             />
//           </div>

//           <div className="work-progress-section">
//             <h1>Work Progress</h1>
//             <form onSubmit={handleSubmitWorkProgress}>
//               <div className="form-group">
//                 <label htmlFor="workDescription">Work Description:</label>
//                 <textarea
//                   id="workDescription"
//                   value={workDescription}
//                   onChange={(e) => setWorkDescription(e.target.value)}
//                 />
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

// export default EmpOpenProject;






// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { signOut } from "firebase/auth";
// import logo from "../Images/logo.png";

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

// const EmpOpenProject = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const [projectTitle, setProjectTitle] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [projectStatus, setProjectStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [workDescription, setWorkDescription] = useState("");

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const projectDoc = await getDoc(doc(db, "project", projectId));
//         if (projectDoc.exists()) {
//           const projectData = projectDoc.data();
//           setProjectTitle(projectData.title);
//           setProjectDescription(projectData.description);
//           setProjectStatus(projectData.status);
//           setStartDate(projectData.startDate);
//           setEndDate(projectData.endDate);
//         } else {
//           console.error("No such project!");
//         }
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       }
//     };

//     fetchProjectDetails();
//   }, [projectId]);

//   const handleBack = () => {
//     navigate("/Empproject");
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => navigate("/"))
//         .catch((error) => console.error("Error signing out:", error));
//     }
//   };

//   const handleSubmitWorkProgress = async (e) => {
//     e.preventDefault();
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userEmail = user.email;
//         const projectRef = doc(db, "project", projectId);

//         await updateDoc(projectRef, {
//           [`workProgress.${userEmail}`]: { description: workDescription },
//         });

//         alert("Work progress updated successfully");
//         setWorkDescription("");
//       }
//     } catch (error) {
//       console.error("Error updating work progress:", error);
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
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
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectDescription">Project Description:</label>
//             <textarea
//               id="projectDescription"
//               value={projectDescription}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectStatus">Project Status:</label>
//             <input
//               type="text"
//               id="projectStatus"
//               value={projectStatus}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date:</label>
//             <input
//               type="text"
//               id="startDate"
//               value={startDate}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date:</label>
//             <input
//               type="text"
//               id="endDate"
//               value={endDate}
//               readOnly
//             />
//           </div>

//           <div className="work-progress-section">
//             <h1>Work Progress</h1>
//             <form onSubmit={handleSubmitWorkProgress}>
//               <div className="form-group">
//                 <label htmlFor="workDescription">Work Description:</label>
//                 <textarea
//                   id="workDescription"
//                   value={workDescription}
//                   onChange={(e) => setWorkDescription(e.target.value)}
//                 />
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

// export default EmpOpenProject;






// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { signOut } from "firebase/auth";
// import logo from "../Images/logo.png";

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

// const EmpOpenProject = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const [projectTitle, setProjectTitle] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [projectStatus, setProjectStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [workDescription, setWorkDescription] = useState("");

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const projectDoc = await getDoc(doc(db, "project", projectId));
//         if (projectDoc.exists()) {
//           const projectData = projectDoc.data();
//           setProjectTitle(projectData.title);
//           setProjectDescription(projectData.description);
//           setProjectStatus(projectData.status);
//           setStartDate(projectData.startDate);
//           setEndDate(projectData.endDate);
//         } else {
//           console.error("No such project!");
//         }
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       }
//     };

//     fetchProjectDetails();
//   }, [projectId]);

//   const handleBack = () => {
//     navigate("/Empproject");
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => navigate("/"))
//         .catch((error) => console.error("Error signing out:", error));
//     }
//   };

//   const handleSubmitWorkProgress = async (e) => {
//     e.preventDefault();
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userEmail = user.email;
//         const projectRef = doc(db, "project", projectId);

//         await updateDoc(projectRef, {
//           [`workProgress.${userEmail}`]: { description: workDescription },
//         });

//         alert("Work progress updated successfully");
//         setWorkDescription("");
//       }
//     } catch (error) {
//       console.error("Error updating work progress:", error);
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
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
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectDescription">Project Description:</label>
//             <textarea
//               id="projectDescription"
//               value={projectDescription}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectStatus">Project Status:</label>
//             <input
//               type="text"
//               id="projectStatus"
//               value={projectStatus}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date:</label>
//             <input
//               type="text"
//               id="startDate"
//               value={startDate}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date:</label>
//             <input
//               type="text"
//               id="endDate"
//               value={endDate}
//               readOnly
//             />
//           </div>

//           <div className="work-progress-section">
//             <h1>Work Progress</h1>
//             <form onSubmit={handleSubmitWorkProgress}>
//               <div className="form-group">
//                 <label htmlFor="workDescription">Work Description:</label>
//                 <textarea
//                   id="workDescription"
//                   value={workDescription}
//                   onChange={(e) => setWorkDescription(e.target.value)}
//                 />
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

// export default EmpOpenProject;






import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import logo from "../Images/logo.png";

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

const EmpOpenProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workDescription, setWorkDescription] = useState("");

  useEffect(() => {
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
        } else {
          console.error("No such project!");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleBack = () => {
    navigate("/Empproject");
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
      const user = auth.currentUser;
      if (user) {
        const userEmail = user.email;
        const projectRef = doc(db, "project", projectId);
        const projectDoc = await getDoc(projectRef);

        if (projectDoc.exists()) {
          const projectData = projectDoc.data();
          let workProgress = projectData.workProgress || [];

          // Find the index of the existing entry for the user
          const existingIndex = workProgress.findIndex(entry => entry.email === userEmail);

          if (existingIndex !== -1) {
            // Update existing entry
            workProgress[existingIndex].description = workDescription;
          } else {
            // Add new entry
            workProgress.push({ email: userEmail, description: workDescription });
          }

          await updateDoc(projectRef, { workProgress });

          alert("Work progress updated successfully");
          setWorkDescription("");
        }
      }
    } catch (error) {
      console.error("Error updating work progress:", error);
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
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Project Description:</label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectStatus">Project Status:</label>
            <input
              type="text"
              id="projectStatus"
              value={projectStatus}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="text"
              id="startDate"
              value={startDate}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="text"
              id="endDate"
              value={endDate}
              readOnly
            />
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

export default EmpOpenProject;
