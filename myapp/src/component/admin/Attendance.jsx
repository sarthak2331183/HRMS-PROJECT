import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"; // Import db from firebase.js
import { onAuthStateChanged, signOut } from "firebase/auth";
import AddAdmin from "./AddAdmin";
import logo from "../Images/logo.png";
import { collection, getDocs, query, where } from "firebase/firestore";

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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("userRole", "==", "employee")
        );
        const querySnapshot = await getDocs(q);

        const employeesData = [];
        querySnapshot.forEach((doc) => {
          // Extract the name, employee ID, branch, post, and other fields from the document data
          const { name, employeeId, branch, post } = doc.data();
          employeesData.push({ id: doc.id, name, employeeId, branch, post });
        });

        setEmployees(employeesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort employees based on selected criteria
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "employeeId") {
      return a.employeeId.localeCompare(b.employeeId);
    } else if (sortBy === "date") {
      // Assuming "date" is a field in the employee object
      return new Date(a.date) - new Date(b.date);
    }
  });

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

  const openDashBoard = () => {
    navigate("/Dashboard");
  };
  const openAddAdmin = () => {
    navigate("/AddAdmin");
  };
  const openEmployee = () => {
    navigate("/Employee");
  };
  const openAdmin = () => {
    navigate("/Admin");
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
            onSelect={openDashBoard}
          />
          <NavItem itemName="Admins" icon="diversity_3" onSelect={openAdmin} />
          <NavItem
            itemName="Employees"
            icon="diversity_3"
            onSelect={openEmployee}
          />
          <NavItem
            itemName="Attendance"
            icon="person_check"
            selected={true}
            onSelect={() => {}}
          />
          <NavItem
            itemName="Projects"
            icon="model_training"
            onSelect={() => {}}
          />
          <NavItem itemName="Payroll" icon="paid" onSelect={() => {}} />
          <NavItem itemName="Setting" icon="settings" onSelect={() => {}} />
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
                <th>Branch</th>
                <th>Post</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.employeeId}</td>
                  <td>2024-03-30</td>
                  <td>Monday</td>
                  <td>{employee.branch}</td>
                  <td>{employee.post}</td>{" "}
                  <td style={{ color: "black" }}>09:00 AM</td>
                  <td style={{ color: "black" }}>06:00 PM</td>
                  <td
                    style={{
                      color:
                        employee.status && employee.status === "Present"
                          ? "green"
                          : "red",
                    }}
                  >
                    {employee.status || "Absent"}
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Add notes"
                      style={{
                        padding: "5px",
                        border: "1px solid #ccc",
                        color: "#677483",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {/* main section ends*/}
    </div>
  );
};

export default Attendance;
