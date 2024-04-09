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
            selected={true}
            onSelect={openDashBoard}
          />
          <NavItem
            itemName="Employees"
            icon="diversity_3"
            onSelect={() => {}}
          />
          <NavItem
            itemName="Attendance"
            icon="person_check"
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
        <h1 id="employee">Employees</h1>
        <div className="search-container">
          <div className="search">
  {/* Search bar */}
  <span className="material-symbols-outlined">search</span>
  <input type="text" placeholder="Search..." />
  </div>
  {/* Sort by dropdown */}
  <div className="dropdown">
  <span className="material-symbols-outlined">sort</span>
  <select>
    <option value="name">Sort by Name</option>
    <option value="id">Sort by ID</option>
  </select>
</div>
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
              {employees.map((employee, index) => (
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
        <button className="add-employee-btn" onClick={openAddEmployee}>
          <span className="material-symbols-outlined">add</span>
          Add Employee
        </button>
      </main>
      {/* main section ends*/}
    </div>
  );
};

export default Employee;