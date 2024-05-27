// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { getDocs, query, collection, where, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import logo from "../Images/logo.png";
// import Popup2 from "./Popup2"; // Import the Popup2 component
// import "./Empdashboard.css";

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

// const Empleave = () => {
//   const navigate = useNavigate();
//   const [userEmail, setUserEmail] = useState("");
//   const [userName, setUserName] = useState("");
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserEmail(user.email);
//         try {
//           const userQuery = query(collection(db, "users"), where("email", "==", user.email));
//           const querySnapshot = await getDocs(userQuery);
//           if (!querySnapshot.empty) {
//             querySnapshot.forEach((doc) => {
//               const userData = doc.data();
//               setUserName(userData.name);
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         setUserEmail("");
//         setUserName("");
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (userEmail) {
//       const fetchLeaveRequests = async () => {
//         try {
//           const leaveQuery = query(collection(db, "leave"), where("email", "==", userEmail));
//           const querySnapshot = await getDocs(leaveQuery);
//           const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setLeaveRequests(data);
//         } catch (error) {
//           console.error("Error fetching leave requests:", error);
//         }
//       };
//       fetchLeaveRequests();
//     }
//   }, [userEmail]);

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => navigate("/"))
//         .catch((error) => console.error("Error signing out:", error));
//     }
//   };

//   const togglePopup = () => setShowPopup(!showPopup);

//   const handleDelete = async (leaveRequestId) => {
//     const confirmed = window.confirm("Are you sure you want to delete this leave request?");
//     if (confirmed) {
//       try {
//         await deleteDoc(doc(db, "leave", leaveRequestId));
//         setLeaveRequests(leaveRequests.filter(request => request.id !== leaveRequestId));
//       } catch (error) {
//         console.error("Error deleting leave request:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (leaveRequestId, newStatus) => {
//     try {
//       await updateDoc(doc(db, "leave", leaveRequestId), { status: newStatus });
//       setLeaveRequests(leaveRequests.map(request => request.id === leaveRequestId ? { ...request, status: newStatus } : request));
//     } catch (error) {
//       console.error("Error updating leave request status:", error);
//     }
//   };

//   const openEmpdashboard = () => navigate('/Empdashboard');

//   const pendingRequests = leaveRequests.filter(request => request.status === "Pending");
//   const approvedRequests = leaveRequests.filter(request => request.status === "Approved");

//   return (
//     <div className="container">
//       <aside>
//   <div className="top">
//     <div className="logo">
//       <img src={logo} alt="Logo" />
//     </div>
//     <div className="close">
//       <span className="material-symbols-outlined">crowdsource</span>
//     </div>
//   </div>

//   <div className="sidebar">
//     <NavItem itemName="Dashboard" icon="grid_view" onSelect={openEmpdashboard} />
//     <NavItem itemName="Attendance" icon="person_check" onSelect={() => {}} />
//     <NavItem itemName="Projects" icon="model_training" onSelect={() => {}} />
//     <NavItem itemName="Leave" icon="prompt_suggestion" selected={true} />
//     <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//   </div>
// </aside>


//       <main>
//         <h1 id="employee">Leave Requests</h1>

//         <div className="project-stats">
//           <button className="all-btn">All: {leaveRequests.length}</button>
//           <button className="pending-btn">Pending: {pendingRequests.length}</button>
//           <button className="approved-btn">Approved: {approvedRequests.length}</button>
//           <button className="leaveType-btn" onClick={togglePopup}>Request Leave</button>
//         </div>

//         <div className="employee_details">
//           <div className="srh-container">
//             <div className="search">
//               <span className="material-symbols-outlined">search</span>
//               <input type="text" placeholder="Search..." />
//             </div>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Leave Type</th>
//                 <th>From</th>
//                 <th>To</th>
//                 <th>Description</th>
//                 <th>Status</th>
//                 <th>Applied On</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaveRequests.map(request => (
//                 <tr key={request.id}>
//                   <td>{request.leaveType}</td>
//                   <td>{request.from.toDate().toLocaleDateString()}</td>
//                   <td>{request.to.toDate().toLocaleDateString()}</td>
//                   <td>{request.description}</td>
//                   <td>
//                     <select
//                       value={request.status}
//                       onChange={(e) => handleStatusChange(request.id, e.target.value)}
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
//                   <td>
//                     <button className="delete-btn" onClick={() => handleDelete(request.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* Popup2 component */}
//       {showPopup && <Popup2 onClose={togglePopup} userEmail={userEmail} userName={userName} />}
//     </div>
//   );
// };

// export default Empleave;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDocs, query, collection, where, deleteDoc, doc } from "firebase/firestore";
import logo from "../Images/logo.png";
import Popup2 from "./Popup2"; // Import the Popup2 component
import "./Empdashboard.css";
import Empproject from "./Empproject";
import EmpAttendance from "./EmpAttendance";

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

const Empleave = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        try {
          const userQuery = query(collection(db, "users"), where("email", "==", user.email));
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUserName(userData.name);
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserEmail("");
        setUserName("");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail) {
      const fetchLeaveRequests = async () => {
        try {
          const leaveQuery = query(collection(db, "leave"), where("email", "==", userEmail));
          const querySnapshot = await getDocs(leaveQuery);
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setLeaveRequests(data);
        } catch (error) {
          console.error("Error fetching leave requests:", error);
        }
      };
      fetchLeaveRequests();
    }
  }, [userEmail]);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error signing out:", error));
    }
  };

  const togglePopup = () => setShowPopup(!showPopup);

  const handleDelete = async (leaveRequestId) => {
    const confirmed = window.confirm("Are you sure you want to delete this leave request?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "leave", leaveRequestId));
        setLeaveRequests(leaveRequests.filter(request => request.id !== leaveRequestId));
      } catch (error) {
        console.error("Error deleting leave request:", error);
      }
    }
  };

  const openEmpdashboard = () => navigate('/Empdashboard');
  const openEmpproject = () => navigate('/Empproject');
  const openEmpAttendance = () => navigate('/EmpAttendance');

  const pendingRequests = leaveRequests.filter(request => request.status === "Pending");
  const approvedRequests = leaveRequests.filter(request => request.status === "Approved");
  const deniedRequests = leaveRequests.filter(request => request.status === "Denied");

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
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={openEmpdashboard} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={openEmpAttendance} />
          <NavItem itemName="Projects" icon="model_training" onSelect={openEmpproject} />
          <NavItem itemName="Leave" icon="prompt_suggestion" selected={true} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      <main>
        <h1 id="employee">Leave Requests</h1>

        <div className="project-stats">
          <button className="all-btn">All: {leaveRequests.length}</button>
          <button className="pending-btn">Pending: {pendingRequests.length}</button>
          <button className="approved-btn">Approved: {approvedRequests.length}</button>
          <button className="denied-btn">Denied: {deniedRequests.length}</button>
          <button className="leaveType-btn" onClick={togglePopup}>Request Leave</button>
        </div>

        <div className="employee_details">
          <div className="srh-container">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search..." />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Description</th>
                <th>Status</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.leaveType}</td>
                  <td>{request.from.toDate().toLocaleDateString()}</td>
                  <td>{request.to.toDate().toLocaleDateString()}</td>
                  <td>{request.description}</td>
                  <td>{request.status}</td>
                  <td>{request.appliedOn.toDate().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Popup2 component */}
      {showPopup && <Popup2 onClose={togglePopup} userEmail={userEmail} userName={userName} />}
    </div>
  );
};

export default Empleave;
