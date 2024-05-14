import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Empdashboard.css";
import logo from '../Images/logo.png';
import "./Empleave.css";
import "./Popup2.jsx"
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

  const handleAddProject = () => {
    navigate('/AddProject');
  };

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: "Sick Leave",
      from: "2024-05-15",
      to: "2024-05-20",
      leaveType: "Sick leave",
      description: "",
      status: "Pending",
      appliedOn: "2024-05-10",
    },
  ]);

  const openLeaveTypes = () => {
    navigate("/Popup2.jsx");
  };

  const handleDelete = (leaveRequestId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this leave request?"
    );
    if (confirmed) {
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== leaveRequestId)
      );
    }
  };

  const handleSubmit = (leaveRequestId) => {
    // Logic to handle submitting the leave request
    alert(`Submitting leave request with ID ${leaveRequestId}`);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      navigate("/");
    }
  };

  const openEmpdashboard = () => navigate("/Empdashboard");


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
          <NavItem itemName="Attendance" icon="person_check" onSelect={() => {}} />
          <NavItem itemName="Projects" icon="model_training" onSelect={() => {}} />
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
          <button className="leaveType-btn" onClick={openLeaveTypes}>Request Leave</button>
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
                <th>Leave Type</th>
                <th>Status</th>
                <th>Applied On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.from}</td>
                  <td>{request.to}</td>
                  <td>
                    <input
                      type="text"
                      value={request.description}
                      onChange={(e) => {
                        const updatedRequests = [...leaveRequests];
                        updatedRequests.find((req) => req.id === request.id).description = e.target.value;
                        setLeaveRequests(updatedRequests);
                      }}
                    />
                  </td>
                  <td>{request.leaveType}</td>
                  <td>
                    <select
                      value={request.status}
                      onChange={(e) => {
                        const updatedRequests = [...leaveRequests];
                        updatedRequests.find((req) => req.id === request.id).status = e.target.value;
                        setLeaveRequests(updatedRequests);
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
                  <td>{request.appliedOn}</td>
                  <td>
                    <button
                      className="submit-btn"
                      onClick={() => handleSubmit(request.id)}
                    >
                      Submit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(request.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
export default Empleave;
