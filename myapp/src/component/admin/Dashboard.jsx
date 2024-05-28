import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  query,
  collection,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import user from "../Employee/user.png";
import logo from "../Images/logo.png";
import ConfirmModal from "../Employee/ConfirmModal"; // Import the ConfirmModal component from the Employee component

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

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [onDutyCount, setOnDutyCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [newJoins, setNewJoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        try {
          const querySnapshot = await getDocs(
            query(collection(db, "users"), where("email", "==", user.email))
          );
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
    const updateDateTime = () => {
      const date = new Date();
      const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    if (hour >= 5 && hour < 12) {
      greetingText = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good Afternoon";
    } else if (hour >= 17 && hour < 20) {
      greetingText = "Good Evening";
    } else {
      greetingText = "Good Night";
    }
    setGreeting(`${greetingText}, ${userName}`);
  }, [userName]);

  useEffect(() => {
    const fetchOnDutyCount = async () => {
      try {
        const today = new Date().toLocaleDateString();
        const attendanceQuery = query(
          collection(db, "attendance"),
          where("date", "==", today)
        );
        const attendanceSnapshot = await getDocs(attendanceQuery);
        setOnDutyCount(attendanceSnapshot.size);
      } catch (error) {
        console.error("Error fetching on-duty count:", error);
      }
    };

    const fetchEmployeeCount = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setEmployeeCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    const fetchTotalProjects = async () => {
      try {
        const projectSnapshot = await getDocs(collection(db, "project"));
        setTotalProjects(projectSnapshot.size);
      } catch (error) {
        console.error("Error fetching total projects:", error);
      }
    };

    const fetchUpcomingProjects = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const upcomingProjectsQuery = query(
          collection(db, "project"),
          where("endDate", ">=", today),
          orderBy("endDate", "asc"),
          limit(3)
        );
        const upcomingProjectsSnapshot = await getDocs(upcomingProjectsQuery);
        const projects = upcomingProjectsSnapshot.docs.map((doc) => doc.data());
        setUpcomingProjects(projects);
      } catch (error) {
        console.error("Error fetching upcoming projects:", error);
      }
    };

    fetchOnDutyCount();
    fetchEmployeeCount();
    fetchTotalProjects();
    fetchUpcomingProjects();
  }, []);

  useEffect(() => {
    const fetchNewJoins = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("userRole", "==", "employee")
        );
        const querySnapshot = await getDocs(q); // Fetching data

        const newJoinsData = [];
        querySnapshot.forEach((doc) => {
          const { name, citizenshipId, jobTitle } = doc.data();
          newJoinsData.push({
            id: doc.id,
            name,
            citizenshipId,
            jobTitle,
          });
        });

        setNewJoins(newJoinsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new joins:", error);
        setLoading(false);
      }
    };

    fetchNewJoins();
  }, []);

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

  const openEmployee = () => {
    navigate("/Employee");
  };

  const openAdmin = () => {
    navigate("/Admin");
  };
  const openAttendance = () => {
    navigate("/Attendance");
  };
  const openProject = () => {
    navigate("/Project");
  };
  const openLeave = () => {
    navigate("/Leave");
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
            selected={true}
            onSelect={() => {}}
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
          <NavItem
            itemName="Leave"
            icon="prompt_suggestion"
            onSelect={openLeave}
          />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      <main>
        <h1>Dashboard</h1>
        <h2>{greeting}</h2>

        <p>Admin</p>

        <div className="inside">
          <div className="sales">
            <h3>On Duty</h3>
            <h3>{onDutyCount}</h3>
          </div>

          <div className="expenses">
            <h3>Employee</h3>
            <h3>{employeeCount}</h3>
          </div>

          <div className="income">
            <h3>Total Projects</h3>
            <h3>{totalProjects}</h3>
          </div>
        </div>

        <div className="recent_order">
          <h2>New Joins</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Citizenship No</th>
                  <th>Post</th>
                </tr>
              </thead>
              <tbody>
                {newJoins.map((employee, index) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.citizenshipId}</td>
                    <td>{employee.jobTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <div className="right">
        <div className="top">
          <button id="menu_bar">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
        <div className="date">
          <input type="text" value={currentDateTime} disabled />
        </div>
        <div className="upcoming_tasks">
          <div className="emp">
            <img src={user} alt="" />
            <div className="emp2">
              <h3>{userName}</h3>
            </div>
          </div>
          <h2>Upcoming Tasks</h2>
          <div className="Meetings">
            {upcomingProjects.map((project, index) => (
              <div className="meeting" key={index}>
                <div className="circle">
                  <span className="number">{index + 1}</span>
                </div>
                <div className="details">
                  <p>
                    <b>{project.title}</b>
                  </p>
                  <p>
                    End Date: {new Date(project.endDate).toLocaleDateString()}
                  </p>
                  <small className="text-muted"></small>
                </div>
                <div className="time">
                  <span className="material-symbols-outlined">more_vert</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLogoutModal && (
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

export default Dashboard;
