// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import AddAdmin from "./AddAdmin";
// import logo from "../Images/logo.png";
// import { collection, getDocs } from "firebase/firestore";
// import View from "./View"; // Import View component

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

// const Attendance = () => {
//   const navigate = useNavigate();
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("name"); // Default sort by name
//   const [selectedEmployee, setSelectedEmployee] = useState(null); 
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const attendanceRef = collection(db, "attendance"); // Reference to the "attendance" collection
//         const querySnapshot = await getDocs(attendanceRef);
    
//         const attendanceData = [];
//         querySnapshot.forEach((doc) => {
//           const attendance = doc.data();
//           attendanceData.push({
//             id: doc.id,
//             name: attendance.name,
//             employeeId: attendance.employeeId,
//             date: attendance.date,
//             day: attendance.day,
//             branch: attendance.branch,
//             post: attendance.post,
//             checkIn: attendance.checkIn ? attendance.checkIn.toDate() : null,
//             checkOut: attendance.checkOut ? attendance.checkOut.toDate() : null,
//             status: attendance.status,
//             project: attendance.project, // Include project in the employee data
//             task: attendance.task, // Include task in the employee data
//             note: attendance.note, // Include note in the employee data
//           });
//         });
    
//         setEmployees(attendanceData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//         setLoading(false);
//       }
//     };
  
//     fetchAttendance();
//   }, []);

//   // Function to calculate hours worked
//   const calculateHoursWorked = (checkIn, checkOut) => {
//     if (checkIn && checkOut) {
//       const diff = Math.abs(checkOut - checkIn);
//       const hours = diff / (1000 * 60 * 60);
//       return hours.toFixed(2);
//     }
//     return "-";
//   };

//   // Function to view work progress
//   const viewWorkProgress = (employee) => {
//     setSelectedEmployee(employee); // Set selected employee
//     setShowModal(true); // Show modal
//   };

//   // Filter employees based on search query
//   const filteredEmployees = employees.filter(
//     (employee) =>
//       employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Sort employees based on selected criteria
//   const sortedEmployees = [...filteredEmployees].sort((a, b) => {
//     if (sortBy === "name") {
//       return a.name.localeCompare(b.name);
//     } else if (sortBy === "employeeId") {
//       return a.employeeId.localeCompare(b.employeeId);
//     } else if (sortBy === "date") {
//       // Assuming "date" is a field in the employee object
//       return new Date(a.date) - new Date(b.date);
//     }
//   });

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       signOut(auth)
//         .then(() => {
//           navigate("/");
//         })
//         .catch((error) => {
//           console.error("Error signing out:", error);
//         });
//     }
//   };

//   const openDashBoard = () => {
//     navigate("/Dashboard");
//   };
//   const openAddAdmin = () => {
//     navigate("/AddAdmin");
//   };
//   const openEmployee = () => {
//     navigate("/Employee");
//   };
//   const openAdmin = () => {
//     navigate("/Admin");
//   };
//   const openProject = () => {
//     navigate("/Project");
//   };
//   const openLeave = () => {
//     navigate("/Leave");
//   };

//   return (
//     <div className="container">
//       {/* aside section starts*/}
//       <aside>
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
//             onSelect={openDashBoard}
//           />
//           <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
//           <NavItem
//             itemName="Employees"
//             icon="badge"
//             onSelect={openEmployee}
//           />
//           <NavItem
//             itemName="Attendance"
//             icon="person_check"
//             selected={true}
//             onSelect={() => {}}
//           />
//           <NavItem
//             itemName="Projects"
//             icon="model_training"
//             onSelect={openProject}
//           />
//           <NavItem itemName="Leave" icon="Prompt_suggestion" onSelect={openLeave} />
//           <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
//         </div>
//       </aside>
//       {/* aside section ends */}

//       {/* main section starts*/}
//       <main>
//         <h1 id="employee">Attendance</h1>
//         <div className="search-container">
//           <div className="search">
//             {/* Search bar */}
//             <span className="material-symbols-outlined">search</span>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           {/* Sort by dropdown */}
//           <div className="dropdown">
//             <span className="material-symbols-outlined">sort</span>
//             <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="name">Sort by Name</option>
//               <option value="employeeId">Sort by Employee ID</option>
//               <option value="date">Sort by Date</option>
//             </select>
//           </div>
//         </div>
//         {/* Attendance table */}
//         <div className="employee_details">
//           <h1>Attendance Report</h1>
//           <table>
//             <thead>
//               <tr>
//                 <th>S.no</th>
//                 <th>Name</th>
//                 <th>Employee ID</th>
//                 <th>Date</th>
//                 <th>Day</th>
//                 <th>Check In Time</th>
//                 <th>Check Out Time</th>
//                 <th>Hours Worked</th>
//                 <th>Worked on</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedEmployees.map((employee, index) => (
//                 <tr key={employee.id}>
//                   <td>{index + 1}</td>
//                   <td>{employee.name}</td>
//                   <td>{employee.employeeId}</td>
//                   <td>{employee.date}</td>
//                   <td>{employee.day}</td>
//                   <td>{employee.checkIn ? employee.checkIn.toLocaleTimeString() : '-'}</td>
//                   <td>{employee.checkOut ? employee.checkOut.toLocaleTimeString() : '-'}</td>
//                   <td>{calculateHoursWorked(employee.checkIn, employee.checkOut)}</td>
//                   <td>
//                     <button onClick={() => viewWorkProgress(employee)}>View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//       {/* main section ends*/}
      
//       {/* View component for displaying work progress */}
//       <View
//         employee={selectedEmployee} // Pass selected employee data as prop
//         showModal={showModal} // Pass showModal state as prop
//         setShowModal={setShowModal} // Pass setShowModal function as prop
//       />
//     </div>
//   );
// };

// export default Attendance;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"; // Import db from firebase.js
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../Images/logo.png";
import { collection, getDocs } from "firebase/firestore";
import View from "./View";

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

const Attendance = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // Default sort by name
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const attendanceRef = collection(db, "attendance"); // Reference to the "attendance" collection
        const querySnapshot = await getDocs(attendanceRef);

        const attendanceData = [];
        querySnapshot.forEach((doc) => {
          const attendance = doc.data();
          attendanceData.push({
            id: doc.id,
            name: attendance.name,
            employeeId: attendance.employeeId,
            date: attendance.date,
            day: attendance.day,
            branch: attendance.branch,
            post: attendance.post,
            checkIn: attendance.checkIn ? attendance.checkIn.toDate() : null,
            checkOut: attendance.checkOut ? attendance.checkOut.toDate() : null,
            status: attendance.status,
            project: attendance.project, // Include project in the employee data
            task: attendance.task, // Include task in the employee data
            note: attendance.note, // Include note in the employee data
          });
        });

        setEmployees(attendanceData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // Function to calculate hours worked
  const calculateHoursWorked = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const diff = Math.abs(checkOut - checkIn);
      const hours = diff / (1000 * 60 * 60);
      return hours.toFixed(2);
    }
    return "-";
  };

  // Function to handle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    }
  };

  return (
    <div className="container">
      {/* aside section starts*/}
      <aside>
        <div className="top">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="close">
            <span className="material-symbols-outlined">crowdsource</span>
          </div>
        </div>
        {/* top ends */}

        <div className="sidebar">
          <NavItem
            itemName="Dashboard"
            icon="grid_view"
            onSelect={() => {}}
          />
          <NavItem itemName="Admins" icon="diversity_3" onSelect={() => {}} />
          <NavItem
            itemName="Employees"
            icon="badge"
            onSelect={() => {}}
          />
          <NavItem
            itemName="Attendance"
            icon="person_check"
            selected={true}
            onSelect={() => {}}
          />
          <NavItem itemName="Projects" icon="model_training" onSelect={() => {}} />
          <NavItem itemName="Leave" icon="Prompt_suggestion" onSelect={() => {}} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>
      {/* aside section ends */}

      {/* main section starts*/}
      <main>
        <h1 id="employee">Attendance</h1>
        <div className="search-container">
          <div className="search">
            {/* Search bar */}
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Sort by dropdown */}
          <div className="dropdown">
            <span className="material-symbols-outlined">sort</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="employeeId">Sort by Employee ID</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>
        {/* Attendance table */}
        <div className="employee_details">
          <h1>Attendance Report</h1>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Day</th>
                <th>Check In Time</th>
                <th>Check Out Time</th>
                <th>Hours Worked</th>
                <th>Worked on</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.employeeId}</td>
                  <td>{employee.date}</td>
                  <td>{employee.day}</td>
                  <td>{employee.checkIn ? employee.checkIn.toLocaleTimeString() : '-'}</td>
                  <td>{employee.checkOut ? employee.checkOut.toLocaleTimeString() : '-'}</td>
                  <td>{calculateHoursWorked(employee.checkIn, employee.checkOut)}</td>
                  <td>
                    <button onClick={() => { setSelectedEmployee(employee); toggleModal(); }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {/* main section ends*/}

      {/* View modal */}
      <View
        employee={selectedEmployee}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Attendance;
