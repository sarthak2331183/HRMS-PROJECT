import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import "./LeaveTypes.css";

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

const LeaveTypes = () => {
  const navigate = useNavigate();

  // State variables for leave types
  const [leaveTypes, setLeaveTypes] = useState([
    { id: 1, name: "Annual Leave" },
    { id: 2, name: "Sick Leave" },
    { id: 3, name: "Maternity Leave" },
  ]);

  // State variable for input field
  const [newLeaveType, setNewLeaveType] = useState("");

  // Sidebar navigation functions
  const openDashboard = () => navigate("/Dashboard");
  const openAdmin = () => navigate("/Admin");
  const openEmployee = () => navigate("/Employee");
  const openProject = () => navigate("/Project");
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      navigate("/");
    }
  };

  // Function to handle deleting a leave type
  const handleDelete = (leaveTypeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this leave type?"
    );
    if (confirmed) {
      setLeaveTypes((prevLeaveTypes) =>
        prevLeaveTypes.filter((type) => type.id !== leaveTypeId)
      );
    }
  };

  // Function to handle adding a new leave type
  const handleAdd = () => {
    if (newLeaveType.trim() !== "") {
      const newType = {
        id: leaveTypes.length + 1,
        name: newLeaveType.trim(),
      };
      setLeaveTypes([...leaveTypes, newType]);
      setNewLeaveType(""); // Clear input field
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
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
            onSelect={openDashboard}
          />
          <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
          <NavItem itemName="Employees" icon="badge" onSelect={openEmployee} />
          <NavItem
            itemName="Projects"
            icon="model_training"
            onSelect={openProject}
          />
          <NavItem itemName="Leave" icon="Prompt_suggestion" selected={true} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      {/* Main content */}
      <main>
        <h1>Leave Type</h1>
        <div className="leave_details">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveTypes.map((type) => (
                <tr key={type.id}>
                  <td>{type.name}</td>
                  <td>
                    <button className="Dltbtn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Input field for adding new leave type */}
        <div className="add-leave-type">
  <p>Leave Type:</p>
  <input
    type="text"
    value={newLeaveType}
    onChange={(e) => setNewLeaveType(e.target.value)}
    placeholder="Enter leave type"
    className="leave-type-input"
  />
  <button className="Addbtn">Add</button>
</div>

      </main>
    </div>
  );
};

export default LeaveTypes;
