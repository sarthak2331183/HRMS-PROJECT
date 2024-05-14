import React from "react";
// import "./Popup5.css";

const Popup5 = ({ employees, onClose, onSelect }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Select Client</h2>
        <ul>
          {employees.map((employee) => (
            <li
              key={employee.id}
              onClick={() => {
                onSelect(employee.name, employee.email);
                onClose();
              }}
            >
              {employee.name} ({employee.email})
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup5;
