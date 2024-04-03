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

const Dashboard = () => {
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
            selected={true}
            onSelect={() => {}}
          />
          <NavItem
            itemName="Employees"
            icon="diversity_3"
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
        <h1>Dashboard</h1>
        <div className="date">
          <input type="date" />
        </div>

        <div className="inside">
          {/* start selling */}
          <div className="sales">
            <span className="material-symbols-outlined">trending_up</span>
            <div className="middle">
              <div className="left">
                <h3>Total Sales</h3>
                <h1>$35,000</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="40" cx="40"></circle>
                </svg>
                <div className="number">80%</div>
              </div>
            </div>
            <small>Last 24 Hours</small>
          </div>
          {/* ends selling */}

          {/* start expenses */}
          <div className="expenses">
            <span className="material-symbols-outlined">local_mall</span>
            <div className="middle">
              <div className="left">
                <h3>Total Expenses</h3>
                <h1>$35,000</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="40" cx="40"></circle>
                </svg>
                <div className="number">80%</div>
              </div>
            </div>
            <small>Last 24 Hours</small>
          </div>
          {/* ends expenses */}

          {/* start income*/}
          <div className="income">
            <span className="material-symbols-outlined">
              stacked_line_chart
            </span>
            <div className="middle">
              <div className="left">
                <h3>Total income</h3>
                <h1>$35,000</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="40" cx="40"></circle>
                </svg>
                <div className="number">80%</div>
              </div>
            </div>
            <small>Last 24 Hours</small>
          </div>
          {/* ends income */}
        </div>
        {/* inside ends */}

        {/* start recent order */}
        <div className="recent_order">
          <h1>Recent Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product ID</th>
                <th>Payments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Innovate Suite</td>
                <td>IS-2023</td>
                <td className="danger">Pending</td>
                <td className="warning">Processing</td>
              </tr>
              <tr>
                <td>CloudConnect</td>
                <td>CC-2452</td>
                <td className="danger">Paid</td>
                <td className="warning">Delivered</td>
              </tr>
              <tr>
                <td>NetGuard Pro</td>
                <td>NG-2314</td>
                <td className="danger">Pending</td>
                <td className="warning">Processing</td>
              </tr>
              <tr>
                <td>SmartTrack Lite</td>
                <td>ST-6563</td>
                <td className="danger">Pending</td>
                <td className="warning">Processing</td>
              </tr>
              <tr>
                <td>DataScape Pro</td>
                <td>DS-5643</td>
                <td className="danger">Paid</td>
                <td className="warning">Shipped</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* ends recent order */}
      </main>
      {/* main section ends*/}

      {/* right section starts*/}
      <div className="right">
        <div className="top">
          <button id="menu_bar">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="profile">
            <div className="info">
              <p>
                <b>Swechhya Maharjan</b>
              </p>
              <p>Admin</p>
              <small className="text-muted"></small>
            </div>
            <div className="profile-photo">
              <img src="Images/Admin.jpg" alt="" />
            </div>
          </div>
        </div>
        {/* ends top */}
       
       {/* Starts upcoming tasks*/}
<div className="upcoming_tasks">
  <h2>Upcoming Tasks</h2>
  <div className="Meetings">
    <div className="meeting">
      <div className="circle">
        <span className="number">1</span>
      </div>
      <div className="details">
        <p>
          <b>Team Meeting</b>
        </p>
        <p>Group D</p>
        <small className="text-muted"></small>
      </div>
      <div className="time">
        <p>12:00-13:00</p>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
    </div>

    <div className="meeting">
      <div className="circle">
        <span className="number">2</span>
      </div>
      <div className="details">
        <p>
          <b>Team Meeting</b>
        </p>
        <p>Group D</p>
        <small className="text-muted"></small>
      </div>
      <div className="time">
        <p>12:00-13:00</p>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
    </div>

    <div className="meeting">
      <div className="circle">
        <span className="number">3</span>
      </div>
      <div className="details">
        <p>
          <b>Team Meeting</b>
        </p>
        <p>Group D</p>
        <small className="text-muted"></small>
      </div>
      <div className="time">
        <p>1:00-13:00</p>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
    </div>
  </div>
</div>
{/* Ends upcoming tasks*/}


        {/* Starts employees on work*/}
        <div className="employees_on_work">
          <h2>Employees On Work</h2>

          <div className="activity">
            <div className="OnWork">
              <span class="material-symbols-outlined">display_settings</span>
            </div>
            <div className="right_text">
              <div className="info">
                <h3>On Duty</h3>
                <small class="text-muted">Total no. of employees Working</small>
              </div>
              <h5 class="danger">44</h5>
            </div>
          </div>

          <div className="activity">
            <div className="OnLeave">
              <span class="material-symbols-outlined">
                <span class="material-symbols-outlined">event_busy</span>
              </span>
            </div>
            <div className="right_text">
              <div className="info">
                <h3>On Leave</h3>
                <small class="text-muted">
                  Total no. of employees on leave
                </small>
              </div>
              <h5 class="danger">20</h5>
            </div>
          </div>

          <div className="activity">
            <div className="Late">
              <span class="material-symbols-outlined">
                <span class="material-symbols-outlined">delete_history</span>
              </span>
            </div>
            <div className="right_text">
              <div className="info">
                <h3>Late</h3>
                <small class="text-muted">
                  Total no. of employees running late to work
                </small>
              </div>
              <h5 class="danger">11</h5>
            </div>
          </div>
        </div>
        {/* Ends employees on work*/}
      </div>
      {/* right section ends*/}
    </div>
  );
};

export default Dashboard;
