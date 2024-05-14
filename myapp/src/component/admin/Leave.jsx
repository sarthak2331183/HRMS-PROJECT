

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import logo from '../Images/logo.png';
// import "./Leave.css";
// import { db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import Popup3 from "./Popup3";

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

// const Leave = () => {
//   const navigate = useNavigate();

//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [selectedDescription, setSelectedDescription] = useState(null);

//   useEffect(() => {
//     const fetchLeaveRequests = async () => {
//       try {
//         const leaveCollection = collection(db, "leave");
//         const snapshot = await getDocs(leaveCollection);
//         const data = snapshot.docs.map(doc => ({
//           id: doc.id,
//           employeeName: doc.data().name,
//           email: doc.data().email,
//           ...doc.data()
//         }));
//         setLeaveRequests(data);
//       } catch (error) {
//         console.error("Error fetching leave requests:", error);
//       }
//     };

//     fetchLeaveRequests();
//   }, []);

//   const openLeaveTypes = () => {
//     navigate("/LeaveTypes");
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
//   const openProject = () => navigate("/Project");

//   const pendingRequests = leaveRequests.filter(request => request.status === "Pending");
//   const approvedRequests = leaveRequests.filter(request => request.status === "Approved");
//   const deniedRequests = leaveRequests.filter(request => request.status === "Denied");

//   const handleDescriptionClick = (description) => {
//     setSelectedDescription(description);
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={openDashboard} />
//           <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
//           <NavItem itemName="Employees" icon="badge" onSelect={openEmployee} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={openAttendance} />
//           <NavItem itemName="Projects" icon="model_training" onSelect={openProject} />
//           <NavItem itemName="Leave" icon="prompt_suggestion" selected={true} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       <main>
//         <h1 id="employee">Leave Requests</h1>
        
//         <div className="project-stats">
//           <button className="stat-btn">All: {leaveRequests.length}</button>
//           <button className="stat-btn">Pending: {pendingRequests.length}</button>
//           <button className="stat-btn">Approved: {approvedRequests.length}</button>
//           <button className="stat-btn">Denied: {deniedRequests.length}</button>
//         </div>
        
//         <div className="employee_details">
//           <div className="srh-container">
//             <div className="search">
//               <span className="material-symbols-outlined">search</span>
//               <input type="text" placeholder="Search..." />
//             </div>
//             <button className="leaveType-btn" onClick={openLeaveTypes}>
//               Leave Type
//             </button>
//           </div>
          
//           <table>
//             <thead>
//               <tr>
//                 <th>Employee Name</th>
//                 <th>Email</th>
//                 <th>From</th>
//                 <th>To</th>
//                 <th>Description</th>
//                 <th>Leave Type</th>
//                 <th>Status</th>
//                 <th>Applied On</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaveRequests.map((request) => (
//                 <tr key={request.id}>
//                   <td>{request.employeeName}</td>
//                   <td>{request.email}</td>
//                   <td>{request.from.toDate().toLocaleDateString()}</td>
//                   <td>{request.to.toDate().toLocaleDateString()}</td>
//                   <td>
//                     <button onClick={() => handleDescriptionClick(request.description)}>
//                       Show Description
//                     </button>
//                   </td>
//                   <td>{request.leaveType}</td>
//                   <td>
//                     <select
//                       value={request.status}
//                       onChange={(e) => {
//                         const updatedRequests = [...leaveRequests];
//                         const index = updatedRequests.findIndex((req) => req.id === request.id);
//                         updatedRequests[index].status = e.target.value;
//                         setLeaveRequests(updatedRequests);
//                       }}
//                       className={
//                         request.status === "Denied" ? "status-denied" :
//                         request.status === "Pending" ? "status-pending" :
//                         request.status === "Approved" ? "status-approved" : ""
//                       }
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Approved">Approved</option>
//                       <option value="Denied">Denied</option>
//                     </select>
//                   </td>
//                   <td>{request.appliedOn.toDate().toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
      
//       {selectedDescription && (
//         <Popup3 description={selectedDescription} onClose={() => setSelectedDescription(null)} />
//       )}
//     </div>
//   );
// };

// export default Leave;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import logo from '../Images/logo.png';
// import "./Leave.css";
// import { db } from "../../firebase";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import Popup3 from "./Popup3";

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

// const Leave = () => {
//   const navigate = useNavigate();

//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [selectedDescription, setSelectedDescription] = useState(null);

//   useEffect(() => {
//     const fetchLeaveRequests = async () => {
//       try {
//         const leaveCollection = collection(db, "leave");
//         const snapshot = await getDocs(leaveCollection);
//         const data = snapshot.docs.map(doc => ({
//           id: doc.id,
//           employeeName: doc.data().name,
//           email: doc.data().email,
//           ...doc.data()
//         }));
//         setLeaveRequests(data);
//       } catch (error) {
//         console.error("Error fetching leave requests:", error);
//       }
//     };

//     fetchLeaveRequests();
//   }, []);

//   const openLeaveTypes = () => {
//     navigate("/LeaveTypes");
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
//   const openProject = () => navigate("/Project");

//   const handleDescriptionClick = (description) => {
//     setSelectedDescription(description);
//   };

//   const renderStatusButton = (status, count) => (
//     <button className="stat-btn" onClick={() => filterByStatus(status)}>
//       {status}: {count}
//     </button>
//   );

//   const filterByStatus = (status) => {
//     const filteredRequests = leaveRequests.filter(request => request.status === status);
//     setLeaveRequests(filteredRequests);
//   };

//   const resetLeaveRequests = () => {
//     const resetRequests = leaveRequests.filter(request => request.status !== "Deleted");
//     setLeaveRequests(resetRequests);
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       const leaveRef = doc(db, "leave", id);
//       await updateDoc(leaveRef, {
//         status: status
//       });
//     } catch (error) {
//       console.error("Error updating status:", error);
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
//           <NavItem itemName="Dashboard" icon="grid_view" onSelect={openDashboard} />
//           <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
//           <NavItem itemName="Employees" icon="badge" onSelect={openEmployee} />
//           <NavItem itemName="Attendance" icon="person_check" onSelect={openAttendance} />
//           <NavItem itemName="Projects" icon="model_training" onSelect={openProject} />
//           <NavItem itemName="Leave" icon="prompt_suggestion" selected={true} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>

//       <main>
//         <h1 id="employee">Leave Requests</h1>
        
//         <div className="project-stats">
//           {renderStatusButton("All", leaveRequests.length)}
//           {renderStatusButton("Pending", leaveRequests.filter(request => request.status === "Pending").length)}
//           {renderStatusButton("Approved", leaveRequests.filter(request => request.status === "Approved").length)}
//           {renderStatusButton("Denied", leaveRequests.filter(request => request.status === "Denied").length)}
//           <button className="stat-btn" onClick={resetLeaveRequests}>Reset</button>
//         </div>
        
//         <div className="employee_details">
//           <div className="srh-container">
//             <div className="search">
//               <span className="material-symbols-outlined">search</span>
//               <input type="text" placeholder="Search..." />
//             </div>
//             <button className="leaveType-btn" onClick={openLeaveTypes}>
//               Leave Type
//             </button>
//           </div>
          
//           <table>
//             <thead>
//               <tr>
//                 <th>Employee Name</th>
//                 <th>Email</th>
//                 <th>From</th>
//                 <th>To</th>
//                 <th>Description</th>
//                 <th>Leave Type</th>
//                 <th>Status</th>
//                 <th>Applied On</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaveRequests.map((request) => (
//                 <tr key={request.id}>
//                   <td>{request.employeeName}</td>
//                   <td>{request.email}</td>
//                   <td>{request.from.toDate().toLocaleDateString()}</td>
//                   <td>{request.to.toDate().toLocaleDateString()}</td>
//                   <td>
//                     <button onClick={() => handleDescriptionClick(request.description)}>
//                       Show Description
//                     </button>
//                   </td>
//                   <td>{request.leaveType}</td>
//                   <td>
//                     <select
//                       value={request.status}
//                       onChange={(e) => {
//                         const newStatus = e.target.value;
//                         updateStatus(request.id, newStatus);
//                       }}
//                       className={
//                         request.status === "Denied" ? "status-denied" :
//                         request.status === "Pending" ? "status-pending" :
//                         request.status === "Approved" ? "status-approved" : ""
//                       }
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Approved">Approved</option>
//                       <option value="Denied">Denied</option>
//                     </select>
//                   </td>
//                   <td>{request.appliedOn.toDate().toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
      
//       {selectedDescription && (
//         <Popup3 description={selectedDescription} onClose={() => setSelectedDescription(null)} />
//       )}
//     </div>
//   );
// };

// export default Leave;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from '../Images/logo.png';
import "./Leave.css";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Popup3 from "./Popup3";

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

const Leave = () => {
  const navigate = useNavigate();

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const leaveCollection = collection(db, "leave");
        const snapshot = await getDocs(leaveCollection);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          employeeName: doc.data().name,
          email: doc.data().email,
          ...doc.data()
        }));
        setLeaveRequests(data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const openLeaveTypes = () => {
    navigate("/LeaveTypes");
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      navigate("/");
    }
  };

  const openDashboard = () => navigate("/Dashboard");
  const openEmployee = () => navigate("/Employee");
  const openAdmin = () => navigate("/Admin");
  const openAttendance = () => navigate("/Attendance");
  const openProject = () => navigate("/Project");

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
  };

  const renderStatusButton = (status, count) => (
    <button className="stat-btn" onClick={() => filterByStatus(status)}>
      {status}: {count}
    </button>
  );

  const filterByStatus = (status) => {
    const filteredRequests = leaveRequests.filter(request => request.status === status);
    setLeaveRequests(filteredRequests);
  };

  const resetLeaveRequests = () => {
    const resetRequests = leaveRequests.filter(request => request.status !== "Deleted");
    setLeaveRequests(resetRequests);
  };

  const updateStatus = async (id, status) => {
    try {
      const leaveRef = doc(db, "leave", id);
      await updateDoc(leaveRef, {
        status: status
      });
      setStatusMessage("Status updated!");
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000); // Clear status message after 3 seconds
    } catch (error) {
      console.error("Error updating status:", error);
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
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={openDashboard} />
          <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
          <NavItem itemName="Employees" icon="badge" onSelect={openEmployee} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={openAttendance} />
          <NavItem itemName="Projects" icon="model_training" onSelect={openProject} />
          <NavItem itemName="Leave" icon="prompt_suggestion" selected={true} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      <main>
        <h1 id="employee">Leave Requests</h1>
        
        <div className="project-stats">
          {renderStatusButton("All", leaveRequests.length)}
          {renderStatusButton("Pending", leaveRequests.filter(request => request.status === "Pending").length)}
          {renderStatusButton("Approved", leaveRequests.filter(request => request.status === "Approved").length)}
          {renderStatusButton("Denied", leaveRequests.filter(request => request.status === "Denied").length)}
          <button className="stat-btn" onClick={resetLeaveRequests}>Reset</button>
        </div>
        
        <div className="employee_details">
          <div className="srh-container">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search..." />
            </div>
            <button className="leaveType-btn" onClick={openLeaveTypes}>
              Leave Type
            </button>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Email</th>
                <th>From</th>
                <th>To</th>
                <th>Description</th>
                <th>Leave Type</th>
                <th>Status</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.email}</td>
                  <td>{request.from.toDate().toLocaleDateString()}</td>
                  <td>{request.to.toDate().toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDescriptionClick(request.description)}>
                      Show Description
                    </button>
                  </td>
                  <td>{request.leaveType}</td>
                  <td>
                    <select
                      value={request.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        updateStatus(request.id, newStatus);
                      }}
                      className={
                        request.status === "Denied" ? "status-denied" :
                        request.status === "Pending" ? "status-pending" :
                        request.status === "Approved" ? "status-approved" : ""
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Denied">Denied</option>
                    </select>
                  </td>
                  <td>{request.appliedOn.toDate().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {statusMessage && <div className="status-message">{statusMessage}</div>}
      </main>
      
      {selectedDescription && (
        <Popup3 description={selectedDescription} onClose={() => setSelectedDescription(null)} />
      )}
    </div>
  );
};

export default Leave;
