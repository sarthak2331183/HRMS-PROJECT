// import React, { useState } from 'react';
// import "./Popup.css";
// import { db } from "../../firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import {
//   getDocs,
//   query,
//   where,
//   setDoc,
// } from "firebase/firestore";

// const Popup = ({ onClose, userEmail, userName, setMessage, onWorkProgressSubmit }) => {
//   const [note, setNote] = useState('');
//   const [selectedProject, setSelectedProject] = useState('');
//   const [selectedTask, setSelectedTask] = useState('');

//   const handleNoteChange = (e) => {
//     setNote(e.target.value);
//   };

//   const handleProjectChange = (e) => {
//     setSelectedProject(e.target.value);
//   };

//   const handleTaskChange = (e) => {
//     setSelectedTask(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       const date = new Date().toLocaleDateString();
//       const attendanceRef = collection(db, "attendance");
//       const querySnapshot = await getDocs(query(attendanceRef, where("email", "==", userEmail), where("date", "==", date)));
//       if (!querySnapshot.empty) {
//         // Update existing document
//         const doc = querySnapshot.docs[0];
//         await setDoc(doc.ref, {
//           ...doc.data(),
//           note: note,
//           project: selectedProject,
//           task: selectedTask,
//           timestamp: serverTimestamp(),
//         }, { merge: true });
//       } else {
//         // Create new document
//         await addDoc(attendanceRef, {
//           email: userEmail,
//           name: userName,
//           date: date,
//           note: note,
//           project: selectedProject,
//           task: selectedTask,
//           timestamp: serverTimestamp(),
//         });
//       }
//       console.log("Work progress recorded successfully.");
//       onWorkProgressSubmit(); // Call the callback function
//       onClose();
//     } catch (error) {
//       console.error("Error recording work progress:", error);
//     }
//   };
  
//   return (
//     <div className="popup-container">
//       <div className="popup">
//         <h2>Daily Work Progress</h2>
//         <select value={selectedProject} onChange={handleProjectChange}>
//           <option value="">Select Project</option>
//           <option value="project1">Project 1</option>
//           <option value="project2">Project 2</option>
//           {/* Add more project options as needed */}
//         </select>
//         <select value={selectedTask} onChange={handleTaskChange}>
//           <option value="">Select Task</option>
//           <option value="task1">Task 1</option>
//           <option value="task2">Task 2</option>
//           {/* Add more task options as needed */}
//         </select>
//         <textarea
//           value={note}
//           onChange={handleNoteChange}
//           placeholder="Enter your note here..."
//         ></textarea>
//         <div className="buttons">
//           <button onClick={handleSubmit}>Submit</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;


// Popup.jsx
// import React, { useState, useEffect } from 'react';
// import "./Popup.css";
// import { db } from "../../firebase";
// import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
// import { query, where, setDoc } from "firebase/firestore";

// const Popup = ({ onClose, userEmail, userName, setMessage, onWorkProgressSubmit }) => {
//   const [note, setNote] = useState('');
//   const [selectedProject, setSelectedProject] = useState('');
//   const [selectedTask, setSelectedTask] = useState('');
//   const [projects, setProjects] = useState([]); // State to store project titles

//   useEffect(() => {
//     // Fetch project titles from Firestore
//     const fetchProjects = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "project"));
//         const projectList = [];
//         querySnapshot.forEach((doc) => {
//           projectList.push({ id: doc.id, title: doc.data().title });
//         });
//         setProjects(projectList);
//       } catch (error) {
//         console.error("Error fetching project titles:", error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleNoteChange = (e) => {
//     setNote(e.target.value);
//   };

//   const handleProjectChange = (e) => {
//     setSelectedProject(e.target.value);
//   };

//   const handleTaskChange = (e) => {
//     setSelectedTask(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       const date = new Date().toLocaleDateString();
//       const attendanceRef = collection(db, "attendance");
//       const querySnapshot = await getDocs(query(attendanceRef, where("email", "==", userEmail), where("date", "==", date)));
//       if (!querySnapshot.empty) {
//         // Update existing document
//         const doc = querySnapshot.docs[0];
//         await setDoc(doc.ref, {
//           ...doc.data(),
//           note: note,
//           project: selectedProject,
//           task: selectedTask,
//           timestamp: serverTimestamp(),
//         }, { merge: true });
//       } else {
//         // Create new document
//         await addDoc(attendanceRef, {
//           email: userEmail,
//           name: userName,
//           date: date,
//           note: note,
//           project: selectedProject,
//           task: selectedTask,
//           timestamp: serverTimestamp(),
//         });
//       }
//       console.log("Work progress recorded successfully.");
//       onWorkProgressSubmit(); // Call the callback function
//       onClose();
//     } catch (error) {
//       console.error("Error recording work progress:", error);
//     }
//   };
  
//   return (
//     <div className="popup-container">
//       <div className="popup">
//         <h2>Daily Work Progress</h2>
//         <select value={selectedProject} onChange={handleProjectChange}>
//           <option value="">Select Project</option>
//           {projects.map(project => (
//             <option key={project.id} value={project.title}>{project.title}</option>
//           ))}
//         </select>
//         <select value={selectedTask} onChange={handleTaskChange}>
//           <option value="">Select Task</option>
//           <option value="task1">Task 1</option>
//           <option value="task2">Task 2</option>
//           {/* Add more task options as needed */}
//         </select>
//         <textarea
//           value={note}
//           onChange={handleNoteChange}
//           placeholder="Enter your note here..."
//         ></textarea>
//         <div className="buttons">
//           <button onClick={handleSubmit}>Submit</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;



import React, { useState, useEffect } from 'react';
import "./Popup.css";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { query, where, setDoc } from "firebase/firestore";

const Popup = ({ onClose, userEmail, userName, setMessage, onWorkProgressSubmit }) => {
  const [note, setNote] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]); // State to store project titles

  useEffect(() => {
    // Fetch project titles assigned to the current user from Firestore
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "project"));
        const projectList = [];
        querySnapshot.forEach((doc) => {
          const projectData = doc.data();
          // Check if current user's email is listed as a member in the project
          if (Object.keys(projectData).some(key => key.startsWith("member") && key.endsWith("Email") && projectData[key] === userEmail)) {
            projectList.push({ id: doc.id, title: projectData.title });
          }
        });
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching project titles:", error);
      }
    };

    fetchProjects();
  }, [userEmail]);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const date = new Date().toLocaleDateString();
      const attendanceRef = collection(db, "attendance");
      const querySnapshot = await getDocs(query(attendanceRef, where("email", "==", userEmail), where("date", "==", date)));
      if (!querySnapshot.empty) {
        // Update existing document
        const doc = querySnapshot.docs[0];
        await setDoc(doc.ref, {
          ...doc.data(),
          note: note,
          project: selectedProject,
          timestamp: serverTimestamp(),
        }, { merge: true });
      } else {
        // Create new document
        await addDoc(attendanceRef, {
          email: userEmail,
          name: userName,
          date: date,
          note: note,
          project: selectedProject,
          timestamp: serverTimestamp(),
        });
      }
      console.log("Work progress recorded successfully.");
      onWorkProgressSubmit(); // Call the callback function
      onClose();
    } catch (error) {
      console.error("Error recording work progress:", error);
    }
  };
  
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Daily Work Progress</h2>
        <select value={selectedProject} onChange={handleProjectChange}>
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.title}>{project.title}</option>
          ))}
        </select>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Enter your note here..."
        ></textarea>
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
