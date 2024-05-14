import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import logo from "../Images/logo.png";
import "./OpenProject.css";

const NavItem = ({ itemName, icon, selected, onSelect }) => {
  return (
    <a
      href="#"
      className={selected ? "active" : ""}
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        onSelect();
      }}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <h3>{itemName}</h3>
    </a>
  );
};

const OpenProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // State variables to hold project details
  const [clientName, setClientName] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workProgress, setWorkProgress] = useState([]);

  // Simulated fetch project details function
  const fetchProjectDetails = () => {
    // Replace this with actual API call to fetch project details
    // For demonstration, a static project object is used
    const staticProjectData = {
      id: 1,
      title: "Project A",
      clientName: "Client 1",
      status: "Ongoing",
      startDate: "2024-01-15",
      endDate: "2024-07-30",
      assignedTo: "Team Alpha",
    };
    setClientName(staticProjectData.clientName);
    setProjectStatus(staticProjectData.status);
    setStartDate(staticProjectData.startDate);
    setEndDate(staticProjectData.endDate);
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const handleBack = () => {
    navigate("/Project");
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error signing out:", error));
    }
  };

  // Function to handle submitting work progress
  const handleSubmitWorkProgress = (e) => {
    e.preventDefault();
    // Get values from form fields and update the workProgress state
    const employeeName = e.target.elements.employeeName.value;
    const submittedOn = e.target.elements.submittedOn.value;
    const time = e.target.elements.time.value;
    const description = e.target.elements.description.value;
    const comments = e.target.elements.comments.value;

    // Add the new work progress to the existing state
    setWorkProgress([
      ...workProgress,
      {
        employeeName,
        submittedOn,
        time,
        description,
        comments,
      },
    ]);

    // Clear the form fields after submission
    e.target.reset();
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
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Dashboard")} />
          <NavItem itemName="Admins" icon="diversity_3" selected={true} onSelect={() => navigate("/Admin")} />
          <NavItem itemName="Employees" icon="badge" onSelect={() => navigate("/Employee")} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/Attendance")} />
          <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={() => navigate("/Leave")} />
        </div>
      </aside>

      {/* Main content */}
      <main>
        <h1>Project Details</h1>

        <div className="About-Project">
          <div className="form-group">
            <label htmlFor="clientName">Client Name:</label>
            <input type="text" id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="projectStatus">Project Status:</label>
            <select id="projectStatus" value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Project Description:</label>
            <textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="teamMembers">Team Members:</label>
            <input type="text" id="teamMembers" value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          {/* Work Progress Section */}
          <div className="work-progress-section">
            <h1>Work Progress</h1>
            {workProgress.map((progress, index) => (
              <div key={index} className="work-progress-item">
                <p>Employee Name: {progress.employeeName}</p>
                <p>Submitted On: {progress.submittedOn}</p>
                <p>Time: {progress.time}</p>
                <p>Description: {progress.description}</p>
                <p>Comments: {progress.comments}</p>
              </div>
            ))}
            <form onSubmit={handleSubmitWorkProgress}>
              <div className="form-group">
                <label htmlFor="employeeName">Employee Name:</label>
                <input type="text" id="employeeName" />
              </div>
              <div className="form-group">
                <label htmlFor="submittedOn">Submitted On:</label>
                <input type="date" id="submittedOn" />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time:</label>
                <input type="time" id="time" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" />
              </div>
              <div className="form-group">
                <label htmlFor="comments">Comments:</label>
                <input type="text" id="comments" />
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

export default OpenProject;

