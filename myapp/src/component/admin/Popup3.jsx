import React from "react";

const Popup3 = ({ description, onClose }) => {
  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const popupInnerStyle = {
    backgroundColor: "white",
    padding: "40px", // Increase padding to increase height
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    position: "relative",
  };

  const closeButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  return (
    <div style={popupStyle}>
      <div style={popupInnerStyle}>
        <button style={closeButtonStyle} onClick={onClose}>Close</button>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Popup3;
