import { useState, useEffect } from "react";
import "./Employee.css";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AddEmployee from "./AddEmployee";
import logo from '../Images/logo.png';
import { auth, db } from '../../firebase';
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

const Employee = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortBy, setSortBy] = useState(""); // State for sorting criteria

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const q = query(collection(db, "users"), where("userRole", "==", "employee"));
        const querySnapshot = await getDocs(q);

        const employeesData = [];
        querySnapshot.forEach((doc) => {
          const { name, gender, mobile, employeeId, employmentType, jobTitle, branch } = doc.data();
          employeesData.push({ id: doc.id, name, gender, mobile, employeeId, employmentType, jobTitle, branch });
        });

        setEmployees(employeesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

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
    } else if (sortBy === "date") {
      // Assuming "date" is a field in the employee object
      return new Date(a.date) - new Date(b.date);
    }
  });

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
    }
  };

  const openDashBoard = () => {
    navigate('/Dashboard');
  };

  const openAddEmployee = () => {
    navigate('/AddEmployee');
  };

  const openAdmin = () => {
    navigate('/Admin');
  };
  const openAttendance = () => {
    navigate('/Attendance');
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
          <NavItem
            itemName="Admins"
            icon="diversity_3"
            onSelect={openAdmin}
          />
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
            onSelect={() => {}}
          />
          <NavItem itemName="Leave" icon="Prompt_suggestion" onSelect={() => {}} />
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
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.employeeId}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.employmentType}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.branch}</td>
                  <td>
                    <a href="#" className="details-link">
                      Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ends recent order */}
      </main>
      {/* main section ends*/}
    </div>
  );
};

export default Employee;
