// import React, { useState, useEffect } from "react";
// import "./Empdashboard.css";
// import { auth, db } from '../../firebase'; // Import db from firebase.js
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { useNavigate } from "react-router-dom";
// import logo from '../Images/logo.png';
// import userImg from '../Employee/user.png';
// import attendance from '../Employee/attendance.png';
// import profile from '../Employee/profile.png';
// import { getDocs, query, collection, where } from "firebase/firestore";

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

// const Empdashboard = () => {
//   const navigate = useNavigate();
//   const [userEmail, setUserEmail] = useState("");
//   const [userName, setUserName] = useState("");
//   const [filteredProjects, setFilteredProjects] = useState([]); // Define filteredProjects state
//   const [greeting, setGreeting] = useState("");
//   const [currentDateTime, setCurrentDateTime] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserEmail(user.email);
//         // Fetch name from Firestore based on user email
//         try {
//           const querySnapshot = await getDocs(
//             query(collection(db, "users"), where("email", "==", user.email))
//           );
//           if (!querySnapshot.empty) {
//             querySnapshot.forEach((doc) => {
//               const userData = doc.data();
//               setUserName(userData.name);
//             });
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//         // Fetch projects for the user
//         try {
//           const projectSnapshot = await getDocs(
//             query(collection(db, "projects"), where("userEmail", "==", user.email))
//           );
//           const projects = [];
//           projectSnapshot.forEach((doc) => {
//             projects.push(doc.data());
//           });
//           setFilteredProjects(projects);
//         } catch (error) {
//           console.error('Error fetching projects:', error);
//         }
//       } else {
//         setUserEmail("");
//         setUserName("");
//         setFilteredProjects([]);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();
//       const date = now.toLocaleDateString();
//       const time = now.toLocaleTimeString();
//       setCurrentDateTime(`${date} ${time}`);
//     };

//     updateDateTime(); // Update immediately
//     const interval = setInterval(updateDateTime, 1000); // Update every second

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const hour = new Date().getHours();
//     let greetingText = "";
//     if (hour >= 5 && hour < 12) {
//       greetingText = "Good Morning";
//     } else if (hour >= 12 && hour < 17) {
//       greetingText = "Good Afternoon";
//     } else if (hour >= 17 && hour < 20) {
//       greetingText = "Good Evening";
//     } else {
//       greetingText = "Good Night";
//     }
//     setGreeting(`${greetingText}, ${userName}`);
//   }, [userName]);

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

//   const openProfile = () => {
//     navigate('/Profile');
//   };
//   const openAttendance = () => {
//     navigate('/EmpAttendance');
//   };
//   const openLeave = () => {
//     navigate('/Empleave');
//   };
//   const openProject = () => {
//     navigate('/Empproject');
//   };

//   return (
//     <div className="container">
//       <aside className="likelynav">
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
//             selected={true}
//             onSelect={() => {}}
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
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       <main>
//         <h1>Dashboard</h1>
//         <h2>{greeting}</h2>
//         <p>Employee</p>
        
//         <div className="tasks">
//           <span className="table_head"><h2>My tasks</h2></span> 
//           <div className="bar_info">
//             <p>Active Task </p>
//             <p>Due Date</p>
//             <p>Status</p>
//           </div>
//           <div className="tasksleft">
//             {filteredProjects.length > 0 ? (
//               filteredProjects.map((project, index) => (
//                 <div key={index}>
//                   <h3>{project.title}</h3>
//                   <p>Due: {project.endDate}</p>
//                   <p>Status</p>
//                 </div>
//               ))
//             ) : (
//               <p>No tasks available</p>
//             )}
//           </div>
  
//           <div className="alltasks" onClick={openProject} style={{ cursor: 'pointer' }}>
//             <hr />
//             <h2>See all tasks</h2>
//           </div>
//         </div>
//       </main>

//       <div className="right">
//         <div className="top">
//           <button id="menu_bar">
//             <span className="material-symbols-outlined">menu</span>
//           </button>
//         </div>
       
//         <div className="upcoming_tasks">
//         <p>{currentDateTime}</p> 
//           <div className="emp">
//             <img src={userImg} alt="User" />  
//             <div className="emp2">
//               <h3>{userName}</h3>
//               <p>Employee</p>
//             </div>      
//           </div>
        
//           <div className="rnd">
//             <h4 onClick={openAttendance}>Attendance <img src={attendance} alt="Attendance" /></h4>
//             <h4 onClick={openProfile} style={{ cursor: 'pointer' }}>Profile <img src={profile} alt="Profile" /></h4>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Empdashboard;











import React, { useState, useEffect } from "react";
import "./Empdashboard.css";
import { auth, db } from '../../firebase'; // Import db from firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import logo from '../Images/logo.png';
import userImg from '../Employee/user.png';
import attendance from '../Employee/attendance.png';
import profile from '../Employee/profile.png';
import { getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
import EmpDet from './EmpDet'; // Import the EmpDet component

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

const Empdashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]); // Define filteredProjects state
  const [greeting, setGreeting] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        // Fetch name from Firestore based on user email
        try {
          const querySnapshot = await getDocs(
            query(collection(db, "users"), where("email", "==", user.email))
          );
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUserName(userData.name);
              setSelectedEmployee({ ...userData, id: doc.id });
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
        // Fetch projects for the user
        try {
          const projectSnapshot = await getDocs(
            query(collection(db, "projects"), where("userEmail", "==", user.email))
          );
          const projects = [];
          projectSnapshot.forEach((doc) => {
            projects.push(doc.data());
          });
          setFilteredProjects(projects);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      } else {
        setUserEmail("");
        setUserName("");
        setFilteredProjects([]);
        setSelectedEmployee(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setCurrentDateTime(`${date} ${time}`);
    };

    updateDateTime(); // Update immediately
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    if (hour >= 5 && hour < 12) {
      greetingText = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good Afternoon";
    } else if (hour >= 17 && hour < 20) {
      greetingText = "Good Evening";
    } else {
      greetingText = "Good Night";
    }
    setGreeting(`${greetingText}, ${userName}`);
  }, [userName]);

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

  const openAttendance = () => {
    navigate('/EmpAttendance');
  };
  const openLeave = () => {
    navigate('/Empleave');
  };
  const openProject = () => {
    navigate('/Empproject');
  };

  const handleSaveEmployee = async (updatedEmployee) => {
    try {
      const employeeDoc = doc(db, "users", updatedEmployee.id);
      await updateDoc(employeeDoc, updatedEmployee);
      setSelectedEmployee(updatedEmployee);
      setShowPopup(false);
    } catch (error) {
      console.error('Error saving employee details:', error);
    }
  };

  return (
    <div className="container">
      <aside className="likelynav">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="close">
            <span className="material-symbols-outlined">crowdsource</span>
          </div>
        </div>

        <div className="sidebar">
          <NavItem
            itemName="Dashboard"
            icon="grid_view"
            selected={true}
            onSelect={() => {}}
          />
          <NavItem
            itemName="Attendance"
            icon="person_check"
            onSelect={openAttendance}
          />
          <NavItem
            itemName="Projects"
            icon="model_training"
            onSelect={openProject}
          />
          <NavItem itemName="Leave" icon="paid" onSelect={openLeave} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      <main>
        <h1>Dashboard</h1>
        <h2>{greeting}</h2>
        <p>Employee</p>
        
        <div className="tasks">
          <span className="table_head"><h2>My tasks</h2></span> 
          <div className="bar_info">
            <p>Active Task </p>
            <p>Due Date</p>
            <p>Status</p>
          </div>
          <div className="tasksleft">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div key={index} onClick={() => setShowPopup(true)} style={{ cursor: 'pointer' }}>
                  <h3>{project.title}</h3>
                  <p>Due: {project.endDate}</p>
                  <p>Status</p>
                </div>
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>
  
          <div className="alltasks" onClick={openProject} style={{ cursor: 'pointer' }}>
            <hr />
            <h2>See all tasks</h2>
          </div>
        </div>
      </main>

      <div className="right">
        <div className="top">
          <button id="menu_bar">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
       
        <div className="upcoming_tasks">
        <p>{currentDateTime}</p> 
          <div className="emp">
            <img src={userImg} alt="User" />  
            <div className="emp2">
              <h3>{userName}</h3>
              <p>Employee</p>
            </div>      
          </div>
        
          <div className="rnd">
            <h4 onClick={openAttendance}>Attendance <img src={attendance} alt="Attendance" /></h4>
            <h4 onClick={() => setShowPopup(true)} style={{ cursor: 'pointer' }}>Profile <img src={profile} alt="Profile" /></h4>
          </div>
        </div>
      </div>

      {showPopup && selectedEmployee && (
        <EmpDet
          employee={selectedEmployee}
          onSave={handleSaveEmployee}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Empdashboard;
