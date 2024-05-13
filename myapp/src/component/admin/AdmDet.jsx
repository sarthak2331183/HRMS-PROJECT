import React, { useState } from "react";

const AdmDet = ({ admin, onSave, onCancel }) => {
  const [editedAdmin, setEditedAdmin] = useState(admin);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    setEditedAdmin({ ...editedAdmin, [field]: value });
  };

  const handleSave = () => {
    onSave(editedAdmin);
    setIsEditing(false);
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="close" onClick={onCancel}>
          &times;
        </button>
        <h2>Admin Details</h2>
        {isEditing ? (
          <div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={editedAdmin.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <label>Contact No.:</label>
              <input
                type="text"
                value={editedAdmin.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
              />
            </div>
            <div>
              <label>Gender:</label>
              <input
                type="text"
                value={editedAdmin.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              />
            </div>
            {/* Additional details from the database */}
            <div>
              <label>Age:</label>
              <input
                type="text"
                value={editedAdmin.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>
            <div>
              <label>Citizenship ID:</label>
              <input
                type="text"
                value={editedAdmin.citizenshipId}
                onChange={(e) =>
                  handleInputChange("citizenshipId", e.target.value)
                }
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={editedAdmin.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <label>Parents Name:</label>
              <input
                type="text"
                value={editedAdmin.parentsName}
                onChange={(e) =>
                  handleInputChange("parentsName", e.target.value)
                }
              />
            </div>
            {/* End of additional details */}
            <div>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <strong>Name:</strong> {admin.name}
            </div>
            <div>
              <strong>Contact No.:</strong> {admin.mobile}
            </div>
            <div>
              <strong>Gender:</strong> {admin.gender}
            </div>
            {/* Additional details from the database */}
            <div>
              <strong>Age:</strong> {admin.age}
            </div>
            <div>
              <strong>Citizenship ID:</strong> {admin.citizenshipId}
            </div>
            <div>
              <strong>Email:</strong> {admin.email}
            </div>
            <div>
              <strong>Parents Name:</strong> {admin.parentsName}
            </div>
            {/* End of additional details */}
            <div>
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmDet;
