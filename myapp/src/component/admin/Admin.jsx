import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from '../../firebase'; // Import db from firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AddAdmin from "./AddAdmin";
import logo from '../Images/logo.png';
import Employee from "./Employee";
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

const Admin = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchAdmins = async () => {
          try {
            const q = query(collection(db, "users"), where("userRole", "==", "admin"));
            const querySnapshot = await getDocs(q);
      
            const adminsData = [];
            querySnapshot.forEach((doc) => {
              // Extract the name, gender, and mobile fields from the document data
              const { name, gender, mobile } = doc.data();
              adminsData.push({ id: doc.id, name, gender, mobile });
            });
      
            setAdmins(adminsData);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching admins:', error);
            setLoading(false);
          }
        };
      
        fetchAdmins();
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
  const openAddAdmin = () => {
    navigate('/AddAdmin');
  };
  const openEmployee = () => {
    navigate('/Employee');
  };
  const openAdmin = () => {
    navigate('/Admin');
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
            itemName="Admins"
            icon="diversity_3"
            onSelect={openAdmin}
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
        <h1 id="employee">Admins</h1>
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
        {/* Admins table */}
        <div className="employee_details">
          <h1>Details of Admins</h1>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Contact No.</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin.id}>
                  <td>{index + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.gender}</td>
                  <td>{admin.mobile}</td>
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
        {/* Add admin button */}
        <button className="add-employee-btn" onClick={openAddAdmin}>
          <span className="material-symbols-outlined">add</span>
          Add Admin
        </button>
      </main>
      {/* main section ends*/}
    </div>
    )
};

export default Admin;