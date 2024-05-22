// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { db } from "../../firebase";
// // import { collection, addDoc, getDocs } from "firebase/firestore";
// // import logo from "../Images/logo.png";
// // import "./AddProject.css";

// // // Sidebar navigation item
// // const NavItem = ({ itemName, icon, selected, onSelect }) => (
// //   <a
// //     href="#"
// //     className={selected ? "active" : ""}
// //     onClick={() => onSelect(itemName)}
// //   >
// //     <span className="material-symbols-outlined">{icon}</span>
// //     <h3>{itemName}</h3>
// //   </a>
// // );

// // const AddProject = () => {
// //   const navigate = useNavigate();

// //   // State variables for form fields
// //   const [projectTitle, setProjectTitle] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [projectDescription, setProjectDescription] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       const usersCollection = collection(db, "users");
// //       const snapshot = await getDocs(usersCollection);
// //       const userList = snapshot.docs.map((doc) => doc.data());
// //       setUsers(userList);
// //     };
// //     fetchUsers();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const selectedUsers = users.slice(0, 5); // Select the first 5 users
// //       await addDoc(collection(db, "project"), {
// //         title: projectTitle,
// //         startDate,
// //         endDate,
// //         description: projectDescription,
// //         status: "Pending",
// //         members: selectedUsers.map((user) => ({
// //           name: user.name,
// //           email: user.email,
// //         })),
// //       });

// //       setSuccessMessage("Project added successfully!");
// //       setTimeout(() => {
// //         navigate("/Project");
// //       }, 2000);
// //     } catch (error) {
// //       console.error("Error adding project:", error);
// //       setErrorMessage("Failed to add project.");
// //     }

// //     setProjectTitle("");
// //     setStartDate("");
// //     setEndDate("");
// //     setProjectDescription("");
// //   };

// //   return (
// //     <div className="container">
// //       <aside>
// //         <div className="top">
// //           <div className="logo">
// //             <img src={logo} alt="Logo" />
// //           </div>
// //           <div className="close">
// //             <span className="material-symbols-outlined">crowdsource</span>
// //           </div>
// //         </div>

// //         <div className="sidebar">
// //           <NavItem
// //             itemName="Dashboard"
// //             icon="grid_view"
// //             onSelect={() => navigate("/Dashboard")}
// //           />
// //           <NavItem
// //             itemName="Admins"
// //             icon="diversity_3"
// //             onSelect={() => navigate("/Admin")}
// //           />
// //           <NavItem
// //             itemName="Employees"
// //             icon="diversity_3"
// //             onSelect={() => navigate("/Employee")}
// //           />
// //           <NavItem itemName="Projects" icon="model_training" selected={true} />
// //           <NavItem itemName="Payroll" icon="paid" />
// //           <NavItem itemName="Setting" icon="settings" />
// //           <NavItem
// //             itemName="Log out"
// //             icon="logout"
// //             onSelect={() => {
// //               const confirmed = window.confirm(
// //                 "Are you sure you want to log out?"
// //               );
// //               if (confirmed) navigate("/");
// //             }}
// //           />
// //         </div>
// //       </aside>

// //       <main>
// //         <h1>Add Project</h1>

// //         {successMessage && (
// //           <p className="add-project-success-message">{successMessage}</p>
// //         )}
// //         {errorMessage && (
// //           <p className="add-project-error-message">{errorMessage}</p>
// //         )}

// //         <form onSubmit={handleSubmit} className="add-project-form">
// //           <div className="add-project-row">
// //             <div className="add-project-column">
// //               <label htmlFor="projectTitle">Project Title:</label>
// //               <input
// //                 type="text"
// //                 id="projectTitle"
// //                 value={projectTitle}
// //                 onChange={(e) => setProjectTitle(e.target.value)}
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="add-project-row">
// //             <div className="add-project-column">
// //               <label htmlFor="startDate">Start Date:</label>
// //               <input
// //                 type="date"
// //                 id="startDate"
// //                 value={startDate}
// //                 onChange={(e) => setStartDate(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div className="add-project-column">
// //               <label htmlFor="endDate">End Date:</label>
// //               <input
// //                 type="date"
// //                 id="endDate"
// //                 value={endDate}
// //                 onChange={(e) => setEndDate(e.target.value)}
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="add-project-row">
// //             <div className="add-project-column">
// //               <label htmlFor="projectDescription">Project Description:</label>
// //               <textarea
// //                 id="projectDescription"
// //                 value={projectDescription}
// //                 onChange={(e) => setProjectDescription(e.target.value)}
// //                 required
// //                 rows="10"
// //               />
// //             </div>
// //           </div>

// //           <div className="add-project-row add-project-buttons">
// //             <button type="submit" className="add-project-btn">
// //               Add Project
// //             </button>
// //             <button
// //               type="button"
// //               className="add-project-cancel-btn"
// //               onClick={() => navigate("/Project")}
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </main>
// //     </div>
// //   );
// // };

// // export default AddProject;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import logo from "../Images/logo.png";
// import "./AddProject.css";

// // Sidebar navigation item
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

// const AddProject = () => {
//   const navigate = useNavigate();

//   // State variables for form fields
//   const [projectTitle, setProjectTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [showUserList, setShowUserList] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersCollection = collection(db, "users");
//       const snapshot = await getDocs(usersCollection);
//       const userList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setUsers(userList);
//     };
//     fetchUsers();
//   }, []);

//   const handleUserSelection = (userId) => {
//     setSelectedUsers((prevSelectedUsers) => {
//       if (prevSelectedUsers.includes(userId)) {
//         return prevSelectedUsers.filter((id) => id !== userId);
//       } else if (prevSelectedUsers.length < 6) {
//         return [...prevSelectedUsers, userId];
//       } else {
//         return prevSelectedUsers;
//       }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const selectedUserDetails = users
//         .filter((user) => selectedUsers.includes(user.id))
//         .map((user) => ({
//           name: user.name,
//           email: user.email,
//         }));

//       await addDoc(collection(db, "project"), {
//         title: projectTitle,
//         startDate,
//         endDate,
//         description: projectDescription,
//         status: "Pending",
//         members: selectedUserDetails,
//       });

//       setSuccessMessage("Project added successfully!");
//       setTimeout(() => {
//         navigate("/Project");
//       }, 2000);
//     } catch (error) {
//       console.error("Error adding project:", error);
//       setErrorMessage("Failed to add project.");
//     }

//     setProjectTitle("");
//     setStartDate("");
//     setEndDate("");
//     setProjectDescription("");
//     setSelectedUsers([]);
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
//           <NavItem
//             itemName="Dashboard"
//             icon="grid_view"
//             onSelect={() => navigate("/Dashboard")}
//           />
//           <NavItem
//             itemName="Admins"
//             icon="diversity_3"
//             onSelect={() => navigate("/Admin")}
//           />
//           <NavItem
//             itemName="Employees"
//             icon="badge"
//             onSelect={() => navigate("/Employee")}
//           />
//           <NavItem itemName="Projects" icon="model_training" selected={true} />
//           <NavItem itemName="Payroll" icon="paid" />
//           <NavItem itemName="Setting" icon="settings" />
//           <NavItem
//             itemName="Log out"
//             icon="logout"
//             onSelect={() => {
//               const confirmed = window.confirm(
//                 "Are you sure you want to log out?"
//               );
//               if (confirmed) navigate("/");
//             }}
//           />
//         </div>
//       </aside>

//       <main>
//         <h1>Add Project</h1>

//         {successMessage && (
//           <p className="add-project-success-message">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="add-project-error-message">{errorMessage}</p>
//         )}

//         <form onSubmit={handleSubmit} className="add-project-form">
//           <div className="add-project-row">
//             <div className="add-project-column">
//               <label htmlFor="projectTitle">Project Title:</label>
//               <input
//                 type="text"
//                 id="projectTitle"
//                 value={projectTitle}
//                 onChange={(e) => setProjectTitle(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="add-project-row">
//             <div className="add-project-column">
//               <label htmlFor="startDate">Start Date:</label>
//               <input
//                 type="date"
//                 id="startDate"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="add-project-column">
//               <label htmlFor="endDate">End Date:</label>
//               <input
//                 type="date"
//                 id="endDate"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="add-project-row">
//             <div className="add-project-column">
//               <label htmlFor="projectDescription">Project Description:</label>
//               <textarea
//                 id="projectDescription"
//                 value={projectDescription}
//                 onChange={(e) => setProjectDescription(e.target.value)}
//                 required
//                 rows="10"
//               />
//             </div>
//           </div>

//           <div className="add-project-row">
//             <div className="add-project-column">
//               <label>Select Employees (Max 6):</label>
//               <button type="button" onClick={() => setShowUserList(!showUserList)} className="select-users-btn">
//                 {showUserList ? "Hide Employees" : "Select Employees"}
//               </button>
//               {showUserList && (
//                 <div className="employee-selection">
//                   {users.map((user) => (
//                     <div
//                       key={user.id}
//                       className={`employee-item ${selectedUsers.includes(user.id) ? "selected" : ""}`}
//                       onClick={() => handleUserSelection(user.id)}
//                     >
//                       {user.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <div className="selected-users">
//                 {selectedUsers.length > 0 && <p>Selected Employees:</p>}
//                 {selectedUsers.map((userId) => {
//                   const user = users.find((user) => user.id === userId);
//                   return <p key={userId}>{user.name}</p>;
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="add-project-row add-project-buttons">
//             <button type="submit" className="add-project-btn">
//               Add Project
//             </button>
//             <button
//               type="button"
//               className="add-project-cancel-btn"
//               onClick={() => navigate("/Project")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default AddProject;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import logo from "../Images/logo.png";
import "./AddProject.css";

// Sidebar navigation item
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

const AddProject = () => {
  const navigate = useNavigate();

  // State variables for form fields
  const [projectTitle, setProjectTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else if (prevSelectedUsers.length < 6) {
        return [...prevSelectedUsers, userId];
      } else {
        return prevSelectedUsers;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedUserDetails = users
        .filter((user) => selectedUsers.includes(user.id))
        .reduce((acc, user, index) => {
          acc[`member${index + 1}Name`] = user.name;
          acc[`member${index + 1}Email`] = user.email;
          return acc;
        }, {});

      await addDoc(collection(db, "project"), {
        title: projectTitle,
        startDate,
        endDate,
        description: projectDescription,
        status: "Pending",
        ...selectedUserDetails,
      });

      setSuccessMessage("Project added successfully!");
      setTimeout(() => {
        navigate("/Project");
      }, 2000);
    } catch (error) {
      console.error("Error adding project:", error);
      setErrorMessage("Failed to add project.");
    }

    setProjectTitle("");
    setStartDate("");
    setEndDate("");
    setProjectDescription("");
    setSelectedUsers([]);
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
          <NavItem
            itemName="Dashboard"
            icon="grid_view"
            onSelect={() => navigate("/Dashboard")}
          />
          <NavItem
            itemName="Admins"
            icon="diversity_3"
            onSelect={() => navigate("/Admin")}
          />
          <NavItem
            itemName="Employees"
            icon="badge"
            onSelect={() => navigate("/Employee")}
          />
          <NavItem itemName="Projects" icon="model_training" selected={true} />
          <NavItem itemName="Payroll" icon="paid" />
          <NavItem itemName="Setting" icon="settings" />
          <NavItem
            itemName="Log out"
            icon="logout"
            onSelect={() => {
              const confirmed = window.confirm(
                "Are you sure you want to log out?"
              );
              if (confirmed) navigate("/");
            }}
          />
        </div>
      </aside>

      <main>
        <h1>Add Project</h1>

        {successMessage && (
          <p className="add-project-success-message">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="add-project-error-message">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="add-project-form">
          <div className="add-project-row">
            <div className="add-project-column">
              <label htmlFor="projectTitle">Project Title:</label>
              <input
                type="text"
                id="projectTitle"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="add-project-row">
            <div className="add-project-column">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="add-project-column">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="add-project-row">
            <div className="add-project-column">
              <label htmlFor="projectDescription">Project Description:</label>
              <textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                rows="10"
              />
            </div>
          </div>

          <div className="add-project-row">
            <div className="add-project-column">
              <label>Select Employees (Max 6):</label>
              <button type="button" onClick={() => setShowUserList(!showUserList)} className="select-users-btn">
                {showUserList ? "Hide Employees" : "Select Employees"}
              </button>
              {showUserList && (
                <div className="employee-selection">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className={`employee-item ${selectedUsers.includes(user.id) ? "selected" : ""}`}
                      onClick={() => handleUserSelection(user.id)}
                    >
                      {user.name}
                    </div>
                  ))}
                </div>
              )}
              <div className="selected-users">
                {selectedUsers.length > 0 && <p>Selected Employees:</p>}
                {selectedUsers.map((userId) => {
                  const user = users.find((user) => user.id === userId);
                  return <p key={userId}>{user.name}</p>;
                })}
              </div>
            </div>
          </div>

          <div className="add-project-row add-project-buttons">
            <button type="submit" className="add-project-btn">
              Add Project
            </button>
            <button
              type="button"
              className="add-project-cancel-btn"
              onClick={() => navigate("/Project")}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProject;
