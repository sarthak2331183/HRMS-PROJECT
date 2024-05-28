import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from '../Images/logo.png';
import ConfirmModal from './ConfirmModal'; // Import the ConfirmModal component
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
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setCurrentUserEmail(userEmail);
        console.log("Logged in user email:", userEmail);

        try {
          const projectCollection = collection(db, "project");
          const snapshot = await getDocs(projectCollection);

          const data = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(project => {
              const memberEmails = Object.keys(project).filter(key => key.startsWith("member") && key.endsWith("Email"));
              return memberEmails.some(key => project[key].toLowerCase() === userEmail.toLowerCase());
            });

          console.log("Fetched projects data:", data);

          setProjects(data);
          setFilteredProjects(data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      } else {
        setCurrentUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenProject = (projectId) => {
    navigate(`/EmpOpenProject/${projectId}`);
  };

  const handleFilterClick = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredProjects(projects);
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

  const handleLogout = () => {
    setShowConfirmModal(true); // Show the confirm modal
  };

  const confirmLogout = () => {
    navigate("/"); // Redirect to home page
    setShowConfirmModal(false); // Hide the confirm modal
  };

  const cancelLogout = () => {
    setShowConfirmModal(false); // Hide the confirm modal
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
          <NavItem itemName="Dashboard" icon="grid_view" onSelect={() => navigate("/Empdashboard")} />
          <NavItem itemName="Attendance" icon="person_check" onSelect={() => navigate("/EmpAttendance")} />
          <NavItem itemName="Projects" icon="model_training" selected={true} onSelect={() => {}}/>
          <NavItem itemName="Leave" icon="paid" onSelect={() => navigate("/Empleave")} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      <main>
        <div className="profile-dashboard">
          <div className="profile-title">Projects</div>
          <div className="dashboard-title">Dashboard &gt;</div>
          <div className="separator"></div>
        </div>

      

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
          </div>

          <table>
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Project Description</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td><button className="action-btn" onClick={() => handleOpenProject(project.id)}>Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* ConfirmModal component */}
      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to log out?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default Empproject;
