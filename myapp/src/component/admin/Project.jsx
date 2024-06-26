import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Dashboard.css";
import logo from '../Images/logo.png';
import "./Project.css";

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

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectCollection = collection(db, "project");
        const snapshot = await getDocs(projectCollection);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(data);
        setFilteredProjects(data); // Initially, set filteredProjects to all projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = () => {
    navigate('/AddProject');
  };

  const handleOpenProject = (projectId) => {
    navigate(`/OpenProject/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "project", projectId));
        // Update both projects and filteredProjects after deletion
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
        setFilteredProjects((prevFilteredProjects) => prevFilteredProjects.filter((p) => p.id !== projectId));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const projectRef = doc(db, "project", projectId);
      await updateDoc(projectRef, { status: newStatus });
      setProjects((prevProjects) => prevProjects.map((p) => p.id === projectId ? { ...p, status: newStatus } : p));
      setFilteredProjects((prevFilteredProjects) => prevFilteredProjects.map((p) => p.id === projectId ? { ...p, status: newStatus } : p));
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const filterProjects = (status) => {
    if (status === "All") {
      return projects;
    } else {
      return projects.filter(project => project.status === status);
    }
  };

  const handleFilterClick = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredProjects(projects); // Set filteredProjects to all projects
    } else {
      const filtered = projects.filter(project => project.status === status);
      setFilteredProjects(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProjects(filtered);
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
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Dashboard")} />
          <NavItem itemName="Admins" icon="diversity_3" onSelect={() => navigate("/Admin")} />
          <NavItem itemName="Employees" icon="badge" onSelect={() => navigate("/Employee")} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/Attendance")} />
          <NavItem itemName="Projects" icon="model_training" selected={true} onSelect={() => {}}/>
          <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={() => navigate("/Leave")} />
          <NavItem itemName="Log out" icon="logout" onSelect={() => {
            const confirmed = window.confirm("Are you sure you want to log out?");
            if (confirmed) navigate("/");
          }} />
        </div>
      </aside>

      <main>
        <h1 id="employee1">Project</h1>

        <div className="project-stats">
          <button className="stat-btn" onClick={() => handleFilterClick("All")}>All: {projects.length}</button>
          <button className="stat-btn" onClick={() => handleFilterClick("Ongoing")}>In Progress: {projects.filter(project => project.status === 'Ongoing').length}</button>
          <button className="stat-btn" onClick={() => handleFilterClick("Completed")}>Completed: {projects.filter(project => project.status === 'Completed').length}</button>
          <button className="stat-btn" onClick={() => handleFilterClick("Pending")}>Pending: {projects.filter(project => project.status === 'Pending').length}</button>
        </div>

        <div className="employee_details">
          <div className="srh-container">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Enter project title..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
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
                <th>Project Description</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>
                    <select value={project.status} onChange={(e) =>  handleStatusChange(project.id, e.target.value)}>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>
                    <button className="open-btn" onClick={() => handleOpenProject(project.id)}>Open</button>                   
                    <button className="delete-btn" onClick={() => handleDelete(project.id)}>Delete</button>
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

export default Project;

