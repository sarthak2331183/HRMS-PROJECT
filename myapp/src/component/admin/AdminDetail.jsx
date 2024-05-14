import React from "react";

const AdminDetail = ({ admin }) => {
  return (
    <div>
      <h2>Admin Details</h2>
      <p>Name: {admin.name}</p>
      <p>Gender: {admin.gender}</p>
      <p>Contact No.: {admin.mobile}</p>
      {/* You can add more details here if needed */}
    </div>
  );
};

export default AdminDetail;
