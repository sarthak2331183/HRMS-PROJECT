import React, { useState, useEffect } from "react";
import "./Empattendances.css";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import user from "../Employee/user.png";
import Empdashboard from "./Empdashboard";
import Popup from "./Popup"; // Ensure this is a default import
import Empproject from "./Empproject";
import ConfirmModal from './ConfirmModal'; // Import the modal component
import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

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

const EmpAttendance = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState("");
  const [checkOutStatus, setCheckOutStatus] = useState("");
  const [workProgressStatus, setWorkProgressStatus] = useState("");
  const [workProgressSubmitted, setWorkProgressSubmitted] = useState(false); // State to track if work progress is submitted
  
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for modal visibility

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
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setCurrentDateTime(`${date} ${time}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "attendance"), where("email", "==", userEmail))
        );
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [userEmail]);

  const handleLogout = () => {
    setShowConfirmModal(true);
  };
  const confirmLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
    setShowConfirmModal(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const openEmpdashboard = () => {
    navigate('/Empdashboard');
  };
  const openEmpproject = () => {
    navigate('/Empproject');
  };
  const recordAttendance = async (checkType) => {
    try {
      const now = new Date();
      const date = now.toLocaleDateString();
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });
      const attendanceRef = collection(db, "attendance");
      
      if (checkType === "checkIn") {
        // Create a new document for the current day
        await addDoc(attendanceRef, {
          email: userEmail,
          name: userName,
          date: date,
          day: day,
          checkIn: serverTimestamp(),
        });
        console.log("Check-in recorded successfully.");
        setCheckInStatus("Check-in done");
      } else if (checkType === "checkOut") {
        // Update the existing document for the current day with check-out time
        const querySnapshot = await getDocs(query(attendanceRef, where("email", "==", userEmail), where("date", "==", date)));
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          await setDoc(doc.ref, {
            ...doc.data(),
            checkOut: serverTimestamp(),
          }, { merge: true });
          console.log("Check-out recorded successfully.");
          setCheckOutStatus("Check-out done");
        }
      }
  
    } catch (error) {
      console.error(`Error recording ${checkType}:`, error);
    }
  };
  

  // const handleCheckIn = () => {
  //   recordAttendance("checkIn");
  // };
  const handleCheckIn = async () => {
    try {
      const now = new Date();
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // Two hours ago
      const lastCheckIn = attendanceData.find(attendance => attendance.checkIn?.toDate() > twoHoursAgo);
      
      if (!lastCheckIn) {
        // No recent check-in within the last two hours, allow check-in
        await recordAttendance("checkIn");
      } else {
        const timeDifference = Math.floor((now.getTime() - lastCheckIn.checkIn.toDate().getTime()) / (1000 * 60)); // Time difference in minutes
        const remainingTime = 120 - timeDifference; // Remaining time in minutes
  
        alert(`You cannot check in again within two hours. Please try again after ${remainingTime} minutes.`);
      }
    } catch (error) {
      console.error("Error handling check-in:", error);
    }
  };
  

  const handleCheckOut = () => {
    if (workProgressSubmitted) { // Allow check-out only if work progress is submitted
      recordAttendance("checkOut");
    } else {
      alert("Please submit your work progress before checking out.");
    }
  };

  const handleWorkProgressSubmit = () => {
    setWorkProgressStatus("Work progress submitted");
    setWorkProgressSubmitted(true); // Set work progress submission status to true
  };

  return (
    <div className="container">
      <aside className="likelynav left">
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
            onSelect={openEmpdashboard}
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
            onSelect={openEmpproject}
          />

          <NavItem itemName="Setting" icon="settings" onSelect={() => {}} />
          <NavItem
            itemName="Log out"
            icon="logout"
            onSelect={handleLogout}
          />
        </div>
      </aside>

      <div className="dashboard-container">
        <div className="navigation">
          <h2>Dashboard</h2>
          <span className="right-arrow">&#62;</span>
          <h2>Attendance</h2>
        </div>
        <div className="buttons">
          <div className="button-group">
            <div>
              <button className="green-button" onClick={handleCheckIn}>
                Check-in Time
              </button>
              {checkInStatus && <p>{checkInStatus}</p>}
            </div>
            <div>
              <button className="red-button" onClick={handleCheckOut}>
                Check-out Time
              </button>
              {checkOutStatus && <p>{checkOutStatus}</p>}
            </div>
            <div>
              <button className="progress-button" onClick={togglePopup}>
                Work Progress
              </button>
              {workProgressStatus && <p>{workProgressStatus}</p>}
            </div>
          </div>
        </div>

        <div className="attendance-record-container">
          <div className="left-section">
            <h2>Attendance Record</h2>
          </div>
          
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Check in Time</th>
              <th>Check out Time</th>
              <th>Hours Worked</th>
              <th>Worked On</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance, index) => (
              <tr key={index}>
                <td>{attendance.date}</td>
                <td>{attendance.day}</td>
                <td>{attendance.checkIn && attendance.checkIn.toDate().toLocaleTimeString()}</td>
                <td>{attendance.checkOut && attendance.checkOut.toDate().toLocaleTimeString()}</td>
                <td>{/* Calculate hours worked */}</td>
                <td>{attendance.project}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="right">
        <div className="top">
          <button id="menu_bar">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        <div className="upcoming_tasks">
          <p>{currentDateTime}</p>
          <div className="emp">
            <img src={user} alt="" />
            <div className="emp2">
              <h3>{userName}</h3>
              <p>Employee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && <Popup onClose={togglePopup} userEmail={userEmail} userName={userName} setMessage={setWorkProgressStatus} onWorkProgressSubmit={handleWorkProgressSubmit} />}
    
  );
  {showConfirmModal && (
    <ConfirmModal
      message="Are you sure you want to log out?"
      onConfirm={confirmLogout}
      onCancel={() => setShowConfirmModal(false)}
    />
  )}
</div>
);
};

export default EmpAttendance;


