import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarPopup.css'; 

const CalendarPopup = ({ selectedDate, onDateChange, onClose }) => {
  return (
    <div className="calendar-popup">
      <div className="calendar-popup-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          inline
        />
      </div>
    </div>
  );
};

export default CalendarPopup;
