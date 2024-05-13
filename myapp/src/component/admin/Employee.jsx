import React, { useState,useEffect } from "react";
import "./Employee.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../Images/logo.png";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Det from "./Det"; // Update import statement

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

const Employee = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortBy, setSortBy] = useState(""); // State for sorting criteria

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

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
          const {
            name,
            gender,
            mobile,
            employeeId,
            employmentType,
            jobTitle,
            branch,
            citizenshipId,
            email,
            age,
            parentsName

          } = doc.data();
          employeesData.push({
            id: doc.id,
            name,
            gender,
            mobile,
            employeeId,
            employmentType,
            jobTitle,
            branch,
            citizenshipId,
            email,
            age,
            parentsName,
            editable: false,
          });
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

  const handleDetailsClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsPopup(true); // Show the details popup
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setShowDetailsPopup(false); // Hide the details popup
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort employees based on selected criteria
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "employeeId") {
      return a.employeeId.localeCompare(b.employeeId);
    } else if (sortBy === "post") {
      // Assuming "post" is a field in the employee object
      return a.post.localeCompare(b.post);
    } else {
      return 0;
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

  const openAddEmployee = () => {
    navigate("/AddEmployee");
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
    navigate("/Attendance");
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "users", employeeId));
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeId)
        );
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEditEmployee = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, editable: !employee.editable }
          : employee
      )
    );
  };

  const handleSaveEmployee = async (updatedEmployee) => {
    try {
      await updateDoc(doc(db, "users", updatedEmployee.id), updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        )
      );
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setSelectedEmployee(null);
    }
  };

  const handleInputChange = (employeeId, field, value) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId ? { ...employee, [field]: value } : employee
      )
    );
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
            icon="badge"
            selected={true}
            onSelect={() => {}}
          />
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
            icon="Prompt_suggestion"
            onSelect={openLeave}
          />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>
      {/* aside section ends */}

      {/* main section starts*/}
      <main>
        <h1 id="employee">Employees</h1>
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
              <option value="employeeId">Sort by ID</option>
              <option value="post">Sort by Post</option>
            </select>
          </div>
          <button className="add-employee-btn" onClick={openAddEmployee}>
            <span className="material-symbols-outlined">add</span>
            Add Employee
          </button>
        </div>

        {/* start employees details */}
        <div className="employee_details">
          <h1>Details of employees</h1>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Contact No.</th>
                <th>Gender</th>
                <th>Type</th>
                <th>Post</th>
                <th>Branch</th>
                <th>Actions</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>
                    {employee.editable ? (
                      <input
                        type="text"
                        value={employee.name}
                        onChange={(e) =>
                          handleInputChange(employee.id, "name", e.target.value)
                        }
                      />
                    ) : (
                      employee.name
                    )}
                  </td>
                  <td>
                    {employee.editable ? (
                      <input
                        type="text"
                        value={employee.employeeId}
                        onChange={(e) =>
                          handleInputChange(
                            employee.id,
                            "employeeId",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      employee.employeeId
                    )}
                  </td>
                  <td>
                    {employee.editable ? (
                      <input
                        type="text"
                        value={employee.mobile}
                        onChange={(e) =>
                          handleInputChange(
                            employee.id,
                            "mobile",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      employee.mobile
                    )}
                  </td>
                  <td>{employee.gender}</td>
                  <td>
                    {employee.editable ? (
                      <input
                        type="text"
                        value={employee.employmentType}
                        onChange={(e) =>
                          handleInputChange(
                            employee.id,
                            "employmentType",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      employee.employmentType
                    )}
                  </td>
                  <td>
                    {employee.editable ? (
                      <input
                        type="text"
                        value={employee.jobTitle}
                        onChange={(e) =>
                          handleInputChange(
                            employee.id,
                            "jobTitle",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      employee.jobTitle
                    )}
                  </td>
                  <td>
                    {employee.editable ? (
                      <input
                        type="text"
                        value={employee.branch}
                        onChange={(e) =>
                          handleInputChange(
                            employee.id,
                            "branch",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      employee.branch
                    )}
                  </td>

                  <td>
                    {employee.editable ? (
                      <button
                        className="save-btn"
                        onClick={() => handleSaveEmployee(employee.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={() => handleEditEmployee(employee.id)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="details-link"
                      onClick={() => handleDetailsClick(employee)} // Handle details click
                    >
                      Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ends recent order */}

        {/* Details Popup */}
        {showDetailsPopup && selectedEmployee && (
          <div className="popup">
            <div className="popup-content">
              <Det
                employee={selectedEmployee}
                onSave={handleSaveEmployee}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}
        {/* Details Popup ends */}
      </main>
      {/* main section ends*/}
    </div>
  );
};

export default Employee;
