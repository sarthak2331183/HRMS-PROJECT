import React, { useState } from "react";

const Det = ({ employee, onSave, onCancel }) => {
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    setEditedEmployee({ ...editedEmployee, [field]: value });
  };

  const handleSave = () => {
    onSave(editedEmployee);
    setIsEditing(false);
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="close" onClick={onCancel}>
          &times;
        </button>
        <h2>Employee Details</h2>
        {isEditing ? (
          <div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={editedEmployee.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <label>Employee ID:</label>
              <input
                type="text"
                value={editedEmployee.employeeId}
                onChange={(e) =>
                  handleInputChange("employeeId", e.target.value)
                }
              />
            </div>
            <div>
              <label>Contact No.:</label>
              <input
                type="text"
                value={editedEmployee.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
              />
            </div>
            <div>
              <label>Gender:</label>
              <input
                type="text"
                value={editedEmployee.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              />
            </div>
            <div>
              <label>Type:</label>
              <input
                type="text"
                value={editedEmployee.employmentType}
                onChange={(e) =>
                  handleInputChange("employmentType", e.target.value)
                }
              />
            </div>
            <div>
              <label>Post:</label>
              <input
                type="text"
                value={editedEmployee.jobTitle}
                onChange={(e) =>
                  handleInputChange("jobTitle", e.target.value)
                }
              />
            </div>
            <div>
              <label>Branch:</label>
              <input
                type="text"
                value={editedEmployee.branch}
                onChange={(e) => handleInputChange("branch", e.target.value)}
              />
            </div>
            {/* Additional details from the database */}
            <div>
              <label>Age:</label>
              <input
                type="text"
                value={editedEmployee.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>
            <div>
              <label>Citizenship ID:</label>
              <input
                type="text"
                value={editedEmployee.citizenshipId}
                onChange={(e) =>
                  handleInputChange("citizenshipId", e.target.value)
                }
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={editedEmployee.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <label>Parents Name:</label>
              <input
                type="text"
                value={editedEmployee.parentsName}
                onChange={(e) =>
                  handleInputChange("parentsName", e.target.value)
                }
              />
            </div>
            <div>
              <label>User Role:</label>
              <input
                type="text"
                value={editedEmployee.userRole}
                onChange={(e) => handleInputChange("userRole", e.target.value)}
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
              <strong>Name:</strong> {employee.name}
            </div>
            <div>
              <strong>Employee ID:</strong> {employee.employeeId}
            </div>
            <div>
              <strong>Contact No.:</strong> {employee.mobile}
            </div>
            <div>
              <strong>Gender:</strong> {employee.gender}
            </div>
            <div>
              <strong>Type:</strong> {employee.employmentType}
            </div>
            <div>
              <strong>Post:</strong> {employee.jobTitle}
            </div>
            <div>
              <strong>Branch:</strong> {employee.branch}
            </div>
            {/* Additional details from the database */}
            <div>
              <strong>Age:</strong> {employee.age}
            </div>
            <div>
              <strong>Citizenship ID:</strong> {employee.citizenshipId}
            </div>
            <div>
              <strong>Email:</strong> {employee.email}
            </div>
            <div>
              <strong>Parents Name:</strong> {employee.parentsName}
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

export default Det;
