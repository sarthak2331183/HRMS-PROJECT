import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Empdashboard.css"; 
import logo from '../Images/logo.png';
import "./Empproject.css"; 

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

const Empproject = () => {
  const navigate = useNavigate();

  const handleAddProject = () => {
    navigate('/AddProject');
  };

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project A",
      clientName: "Client 1",
      status: "Ongoing",
      startDate: "2024-01-15",
      endDate: "2024-07-30",
      assignedTo: "Team Alpha",
    },
    {
      id: 2,
      title: "Project B",
      clientName: "Client 2",
      status: "Completed",
      startDate: "2023-06-10",
      endDate: "2023-12-20",
      assignedTo: "Team Beta",
    },
  ]);

  const handleEdit = (projectId) => {
    console.log("Editing project with ID:", projectId);
    // Logic for editing (e.g., open a modal or navigate to an edit page)
  };

  const handleDelete = (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmed) {
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      navigate("/");
    }
  };

  const openDashboard = () => navigate("/Empdashboard");
  const openAttendance = () => navigate("/Empattendance");
  const openLeave = () => navigate("/Empleave");

  const upcomingProjects = projects.filter(
    (project) => new Date(project.startDate) > new Date()
  );
  const inProgressProjects = projects.filter(
    (project) => project.status === 'Ongoing'
  );
  const completedProjects = projects.filter(
    (project) => project.status === 'Completed'
  );
  const cancelledProjects = projects.filter(
    (project) => project.status === 'Cancelled'
  );
  const endedProjects = projects.filter(
    (project) => new Date(project.endDate) < new Date() || project.status === 'Ended'
  );

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
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={openDashboard} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={openAttendance} />
          <NavItem itemName="Projects" icon="model_training" selected={true} />
          <NavItem itemName="Leave" icon="Prompt_suggestion" onSelect={openLeave} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      {/* Main content */}
      <main>
        <h1 id="employee">Project</h1>
        
        {/* Project statistics */}
        <div className="project-stats">
          <button className="stat-btn">Upcoming: {upcomingProjects.length}</button>
          <button className="stat-btn">In Progress: {inProgressProjects.length}</button>
          <button className="stat-btn">Completed: {completedProjects.length}</button>
          <button className="stat-btn">Cancelled: {cancelledProjects.length}</button>
          <button className="stat-btn">Ended: {endedProjects.length}</button>
        </div>

        {/* Project table and search */}
        <div className="employee_details">
          <div className="srh-container">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Enter project title..." />
            </div>
            <button className="add-project-btn" onClick={handleAddProject}>
              <span className="material-symbols-outlined">add</span>
              Add Project
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Client Name</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.clientName}</td>
                  <td>{project.status}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.assignedTo}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(project.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(project.id)}
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

export default Empproject;