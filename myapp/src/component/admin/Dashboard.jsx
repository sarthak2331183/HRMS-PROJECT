import React from 'react';
import './Dashboard.css'; // Import the CSS file

const NavItem = ({ itemName, icon, selected, onSelect }) => {
    return (
        <a href="#" className={selected ? 'active' : ''} onClick={() => onSelect(itemName)}>
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
                        <h2>Innovate<span className="danger">Nepal</span></h2>
                    </div>
                    <div className="close">
                        <span className="material-symbols-outlined">crowdsource</span>
                    </div>
                </div>
                {/* top ends */}

                <div className="sidebar">
                    <NavItem itemName="Dashboard" icon="grid_view" selected={true} onSelect={() => {}} />
                    <NavItem itemName="Employees" icon="diversity_3" onSelect={() => {}} />
                    <NavItem itemName="Attendance" icon="person_check" onSelect={() => {}} />
                    <NavItem itemName="Projects" icon="model_training" onSelect={() => {}} />
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
                        <span className="material-symbols-outlined">stacked_line_chart</span>
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
                                <td>Mini USB</td>
                                <td>20CS</td>
                                <td>Pending</td>
                                <td className="warning">Pending</td>
                            </tr>
                            <tr>
                                <td>Mini USB</td>
                                <td>20CS</td>
                                <td>Pending</td>
                                <td className="warning">Pending</td>
                            </tr>
                            <tr>
                                <td>Mini USB</td>
                                <td>20CS</td>
                                <td>Pending</td>
                                <td className="warning">Pending</td>
                            </tr>
                            <tr>
                                <td>Mini USB</td>
                                <td>20CS</td>
                                <td>Pending</td>
                                <td className="warning">Pending</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* ends recent order */}
            </main>
            {/* main section ends*/}

            {/* right section starts*/}
            <div className="right">
                <h1>Right</h1>
            </div>
            {/* right section ends*/}
        </div>
    );
};

export default Dashboard;
