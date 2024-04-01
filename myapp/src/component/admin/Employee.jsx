import React from "react";
import "./Dashboard.css";

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

const Employee = () => {
  return (
    <div className="container">
      {/* aside section starts*/}
      <aside>
        <div className="top">
          <div className="logo">
            <h2>
              Innovate<span className="danger">Nepal</span>
            </h2>
          </div>
          <div className="close">
            <span className="material-symbols-outlined">crowdsource</span>
          </div>
        </div>
        {/* top ends */}

        <div className="sidebar">
          <NavItem
            itemName="Dashboard"
            icon="grid_view"
            onSelect={() => {}}
          />
          <NavItem
            itemName="Employees"
            icon="diversity_3"
            selected={true}
            onSelect={() => {}}
          />
          <NavItem
            itemName="Attendance"
            icon="person_check"
            onSelect={() => {}}
          />
          <NavItem
            itemName="Projects"
            icon="model_training"
            onSelect={() => {}}
          />
          <NavItem itemName="Payroll" icon="paid" onSelect={() => {}} />
          <NavItem itemName="Setting" icon="settings" onSelect={() => {}} />
          <NavItem itemName="Log out" icon="logout" onSelect={() => {}} />
        </div>
      </aside>
      {/* aside section ends */}

      {/* main section starts*/}
      <main>
        <h1>Employees</h1>
        
        {/* start employees details */}
        <div className="recent_order">
          <h1>Details of employees</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Contact No.</th>
                <th>Citizenship No.</th>
                <th>Post</th>
                <th>Branch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aashish Thapa</td>
                <td>AT-01</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Business Analyst</td>
                <td>Sanepa, Lalitpur</td>
                
              </tr>
              <tr>
              <td>Aniv Maharjan</td>
                <td>AM-02</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Developer</td>
                <td>Sanepa, Lalitpur</td>
              </tr>
              <tr>
              <td>Shrijan Bikram Thapa</td>
                <td>SBT-03</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Developer</td>
                <td>Bhotahiti, Kathmandu</td>
              </tr>
              <tr>
              <td>Sarthak Neupane</td>
                <td>SN-04</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Project Manager</td>
                <td>Kathmandu</td>
              </tr>
              <tr>
              <td>Swechhya Maharjan</td>
                <td>SM-05</td>
                <td>9834251612</td>
                <td>00-23-34-12342</td>
                <td>Developer</td>
                <td>Kathmandu</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* ends recent order */}
        <button></button>
      </main>
      {/* main section ends*/}
    </div>
  );
};

export default Employee;


