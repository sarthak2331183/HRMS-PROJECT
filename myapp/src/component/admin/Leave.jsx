import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "../Images/logo.png";
import "./Leave.css";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth"; // Import signOut from Firebase Authentication
import { auth } from "../../firebase"; // Import auth from Firebase Authentication
import Popup3 from "./Popup3";
import ConfirmModal from '../Employee/ConfirmModal'; 

const Leave = () => {
  const navigate = useNavigate();

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Define showLogoutModal state

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const leaveCollection = collection(db, "leave");
        const snapshot = await getDocs(leaveCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          employeeName: doc.data().name,
          email: doc.data().email,
          ...doc.data(),
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
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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
    const filteredRequests = leaveRequests.filter(
      (request) => request.status === status
    );
    setLeaveRequests(filteredRequests);
  };

  const resetLeaveRequests = () => {
    const resetRequests = leaveRequests.filter(
      (request) => request.status !== "Deleted"
    );
    setLeaveRequests(resetRequests);
  };

  const updateStatus = async (id, status) => {
    try {
      // Update the status directly in the leaveRequests state
      const updatedRequests = leaveRequests.map((request) =>
        request.id === id ? { ...request, status: status } : request
      );
      setLeaveRequests(updatedRequests);
  
      // Update the status in the Firestore database
      const leaveRef = doc(db, "leave", id);
      await updateDoc(leaveRef, { status: status });
  
      setStatusMessage("Status updated!");
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000); // Clear status message after 3 seconds
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  // Filtered leave requests based on search query
  const filteredLeaveRequests = leaveRequests.filter(
    (request) =>
      request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            onSelect={openDashboard}
          />
          <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
          <NavItem itemName="Employees" icon="badge" onSelect={openEmployee} />
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
          <NavItem itemName="Leave" icon="prompt_suggestion" selected={true} onSelect={() => {}}/>
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      <main>
        <h1 id="employee1">Leave Requests</h1>

        <div className="project-stats">
          {renderStatusButton("All", leaveRequests.length)}
          {renderStatusButton(
            "Pending",
            leaveRequests.filter((request) => request.status === "Pending")
              .length
          )}
          {renderStatusButton(
            "Approved",
            leaveRequests.filter((request) => request.status === "Approved")
              .length
          )}
          {renderStatusButton(
            "Denied",
            leaveRequests.filter((request) => request.status === "Denied")
              .length
          )}
          <button className="stat-btn" onClick={resetLeaveRequests}>
            Reset
          </button>
        </div>

        <div className="employee_details">
          <div className="srh-container">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
              {filteredLeaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.email}</td>
                  <td>{request.from.toDate().toLocaleDateString()}</td>
                  <td>{request.to.toDate().toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDescriptionClick(request.description)
                      }
                      style={{
                        border: "1px solid black",
                        borderRadius: "5px",                        cursor: "pointer",
                        padding: "5px 10px",
                        background: "white",
                        fontSize: "12px",
                      }}
                    >
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
                        request.status === "Denied"
                          ? "status-denied"
                          : request.status === "Pending"
                          ? "status-pending"
                          : request.status === "Approved"
                          ? "status-approved"
                          : ""
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
        <Popup3
          description={selectedDescription}
          onClose={() => setSelectedDescription(null)}
        />
      )}
      {showLogoutModal && ( // Display the ConfirmModal if showLogoutModal is true
        <ConfirmModal
          message="Are you sure you want to log out?"
          confirmText="Log Out"
          cancelText="Cancel"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

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

export default Leave;

