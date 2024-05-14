// import React from "react";

// const View = ({ employee, showModal, setShowModal, workDetails }) => {
//   return (
//     <>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowModal(false)}>&times;</span>
//             {workDetails && (
//               <div>
//                 <h2>Work Details</h2>
//                 <p>Project: {workDetails.project}</p>
//                 <p>Task: {workDetails.task}</p>
//                 <p>Note: {workDetails.note}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default View;



import React from "react";
import "./View.css";

const View = ({ employee, showModal, setShowModal }) => {
  return (
    <>
      {showModal && employee && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>

            <div>
              <h2>Work Details</h2>
              <p>Project: {employee.project}</p>
              <p>Task: {employee.task}</p>
              <p>Note: {employee.note}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default View;
