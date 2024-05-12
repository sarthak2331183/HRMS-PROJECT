import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"; // Import db from firebase.js
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import logo from "../Images/logo.png";

const NavItem = ({ itemName, icon, selected, onSelect }) => {
  return (
    <a
      href="#"
      className={selected ? "active" : ""}
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        onSelect();
      }}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <h3>{itemName}</h3>
    </a>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const q = query(collection(db, "users"), where("userRole", "==", "admin"));
        const querySnapshot = await getDocs(q);

        const adminsData = [];
        querySnapshot.forEach((doc) => {
          const { name, gender, mobile } = doc.data();
          adminsData.push({ id: doc.id, name, gender, mobile, editable: false });
        });

        setAdmins(adminsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admins:", error);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error signing out:", error));
    }
  };

  const openDashBoard = () => navigate("/Dashboard");
  const openAddAdmin = () => navigate("/AddAdmin");
  const openEmployee = () => navigate("/Employee");
  const openAttendance = () => navigate("/Attendance");
  const openProject = () => navigate("/Project");
  const openLeave = () => navigate("/Leave");

  const handleDeleteAdmin = async (adminId) => {
    const confirmed = window.confirm("Are you sure you want to delete this admin?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "users", adminId));
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
      } catch (error) {
        console.error("Error deleting admin:", error);
      }
    }
  };

  const handleEditAdmin = (adminId) => {
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.id === adminId ? { ...admin, editable: true } : admin
      )
    );
  };

  const handleSaveAdmin = async (adminId) => {
    const adminToSave = admins.find((admin) => admin.id === adminId);
    try {
      await updateDoc(doc(db, "users", adminId), {
        name: adminToSave.name,
        gender: adminToSave.gender,
        mobile: adminToSave.mobile
      });
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === adminId ? { ...admin, editable: false } : admin
        )
      );
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  // Filter admins based on the search query
  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.mobile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort admins based on the selected criteria
  const sortedAdmins = [...filteredAdmins].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "id") {
      return a.id.localeCompare(b.id);
    } else {
      return 0;
    }
  });

  return (
    <div className="container">
      {/* Aside Section */}
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
            onSelect={openDashBoard}
          />
          <NavItem
            itemName="Admins"
            icon="diversity_3"
            selected={true}
            onSelect={() => navigate("/Admin")}
          />
          <NavItem
            itemName="Employees"
            icon="badge"
            onSelect={openEmployee}
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
          <NavItem itemName="Leave" icon="prompt_suggestion" onSelect={openLeave} />
          <NavItem itemName="Log Out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>

      {/* Main Section */}
      <main>
        <h1>Admins</h1>

        <div className="search-container">
          <div className="search">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="dropdown">
            <span className="material-symbols-outlined">sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="id">Sort by ID</option>
            </select>
          </div>
          <button className="add-employee-btn" onClick={openAddAdmin}>
          <span className="material-symbols-outlined">add</span>
          Add Admin
        </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="employee_details">
            <h1>Details of Admins</h1>
            <table>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Contact No.</th>
                  <th>Actions</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {sortedAdmins.map((admin, index) => (
                  <tr key={admin.id}>
                    <td>{index + 1}</td>
                    <td>
                      {admin.editable ? (
                        <input
                          type="text"
                          value={admin.name}
                          onChange={(e) =>
                            setAdmins((prevAdmins) =>
                              prevAdmins.map((a) =>
                                a.id === admin.id ? { ...a, name: e.target.value } : a
                              )
                            )
                          }
                        />
                      ) : (
                        admin.name
                      )}
                    </td>
                    <td>{admin.gender}</td>
                    <td>
                      {admin.editable ? (
                        <input
                          type="text"
                          value={admin.mobile}
                          onChange={(e) =>
                            setAdmins((prevAdmins) =>
                              prevAdmins.map((a) =>
                                a.id === admin.id ? { ...a, mobile: e.target.value } : a
                              )
                            )
                          }
                        />
                      ) : (
                        admin.mobile
                      )}
                    </td>
                    <td>
                      {admin.editable ? (
                        <button
                          className="save-btn"
                          onClick={() => handleSaveAdmin(admin.id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={() => handleEditAdmin(admin.id)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteAdmin(admin.id)}
                      >
                        Delete
                      </button>
                    </td>
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
        )}
      </main>
    </div>
  );
};

export default Admin;
