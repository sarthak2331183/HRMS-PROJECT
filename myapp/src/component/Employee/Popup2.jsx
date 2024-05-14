
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./Popup2.css";

const Popup2 = ({ onClose, userEmail, userName }) => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "leave"), {
        leaveType,
        from: fromDate,
        to: toDate,
        description,
        appliedOn: serverTimestamp(),
        status: "Pending",
        email: userEmail,
        name: userName,
      });
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <h2>Request Leave</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="">Select leave type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="date-group">
            <div className="form-group">
              <label>From</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
            <div className="form-group">
              <label>To</label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="popup-buttons">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup2;
