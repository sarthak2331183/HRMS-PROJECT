import React from "react";
import "./Employee.css";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AddEmployee from "./AddEmployee";



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
            <h2>
              Innovate<span className="danger">Nepal</span>
            </h2>
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
                <th>Citizenship No.</th>
                <th>Post</th>
                <th>Branch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>Aashish Thapa</td>
                <td>AT-01</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Business Analyst</td>
                <td>Sanepa, Lalitpur</td>
                <td>
                  <a href="#" className="details-link">
                    Details
                  </a>
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>Aniv Maharjan</td>
                <td>AM-02</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Developer</td>
                <td>Sanepa, Lalitpur</td>
                <td>
                  <a href="#" className="details-link">
                    Details
                  </a>
                </td>
              </tr>
              <tr>
                <td>03</td>
                <td>Shrijan Bikram Thapa</td>
                <td>SBT-03</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Developer</td>
                <td>Bhotahiti, Kathmandu</td>
                <td>
                  <a href="#" className="details-link">
                    Details
                  </a>
                </td>
              </tr>
              <tr>
                <td>04</td>
                <td>Sarthak Neupane</td>
                <td>SN-04</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Project Manager</td>
                <td>Kathmandu</td>
                <td>
                  <a href="#" className="details-link">
                    Details
                  </a>
                </td>
              </tr>
              <tr>
                <td>05</td>
                <td>Swechhya Maharjan</td>
                <td>SM-05</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Developer</td>
                <td>Kathmandu</td>
                <td>
                  <a href="#" className="details-link">
                    Details
                  </a>
                </td>
              </tr>
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
