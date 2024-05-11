import React from 'react';
import './Empdashboard.css';
import logo from '../Images/logo.png'
import { useNavigate } from "react-router-dom";
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
// Example functional component
const Empdashboard = () => {
  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
    }
  };
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F8FAFD' }}>
      <div style={{ width: 1054, height: 739, left: 314, top: 109, position: 'absolute', background: 'white', borderRadius: 20 }}>
      
        <div style={{ paddingBottom: 3, left: 30, top: 63, position: 'absolute', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 19, display: 'inline-flex' }}>
          <div style={{ width: 199, height: 656, position: 'relative', background: '#F8FAFD', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
            <div style={{ width: 167, height: 167, background: '#D9D9D9', borderRadius: 9999 }} />
            
           
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>Aashish Thapa</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Business Analyst</div>
            <div style={{ width: 78, height: 32, position: 'relative' }}>
              <div style={{ width: 78, height: 32, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 14 }} />
              <img style={{ width: 18, height: 18, left: 49, top: 5, position: 'absolute' }} src="https://via.placeholder.com/18x18" />
              <div style={{ left: 16, top: 7, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}>Edit</div>
            </div>
          
            
          </div>
          <div style={{ width: 796, height: 656, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
            <div style={{ width: 796, height: 143, position: 'relative' }}>
            <div style={{ left: 11, top: 0, position: 'absolute', color: '#172985', fontSize: 18, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Personal Information</div>
            <div style={{ display: 'flex', alignItems: 'center', left: 14, top: 40, position: 'absolute' }}>
            <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Employee ID:</div>
  <div style={{ marginLeft: 37, color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Emp-01</div>
</div>

<div style={{ left: 398, top: 40, position: 'absolute' }}>
  <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Gender</div>
  <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Male</div>
</div>
<div style={{ left: 14, top: 70, position: 'absolute', display: 'flex', justifyContent: 'space-between' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Phone:</div>
  <div style={{ marginLeft: 80, color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>(977) 982-747-5866</div>
</div>



<div style={{ left: 398, top: 70, position: 'absolute' }}>
<div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Maritial Status:</div>
  <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Single</div>
</div>
<div style={{ left: 14, top: 100, position: 'absolute' }}>
  <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Email</div>
  <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>email21.@email.com</div>
</div>
<div style={{ left: 398, top: 100, position: 'absolute' }}>
  <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Country</div>
  <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Nepal</div>
</div>
<div style={{ left: 14, top: 125, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '38px', wordWrap: 'break-word' }}>Date of Birth:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>March 26, 2002</div>
</div>



 <div style={{ left: 398, top: 125, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '38px', wordWrap: 'break-word' }}>Date of Birth:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>March 26, 2002</div>
</div>

              <div style={{ width: 56.06, height: 23, left: 733, top: 6, position: 'absolute' }}>
                <div style={{ width: 56.06, height: 23, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 10.06 }} />
                <img style={{ width: 12.94, height: 12.94, left: 35.22, top: 3.59, position: 'absolute' }} src="https://via.placeholder.com/13x13" />
                <div style={{ left: 11.50, top: 5.03, position: 'absolute', color: '#1045FF', fontSize: 10.78, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}>Edit</div>
              </div>
            </div>
            <div style={{ width: 785, height: 0, border: '1px black solid' }}></div>
            <div style={{ width: 796, height: 88, position: 'relative' }}>
              <div style={{ left: 11, top: 0, position: 'absolute', color: '#172985', fontSize: 18, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Address Information</div>
              <div style={{ left: 14, top: 31, position: 'absolute' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Address</div>
                <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Dhumbarahi</div>
              </div>
              <div style={{ left: 398, top: 31, position: 'absolute' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Hometown</div>
                <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Naxal</div>
              </div>
              <div style={{ left: 14, top: 58, position: 'absolute' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>City</div>
                <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Kathmandu</div>
              </div>
              <div style={{ left: 398, top: 58, position: 'absolute' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>City</div>
                <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Nepal</div>
              </div>
              <div style={{ width: 56.06, height: 23, left: 732, top: 6, position: 'absolute' }}>
                <div style={{ width: 56.06, height: 23, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 10.06 }} />
                <img style={{ width: 12.94, height: 12.94, left: 35, top: 3, position: 'absolute' }} src="https://via.placeholder.com/13x13" />
                <div style={{ left: 8, top: 5, position: 'absolute', color: '#1045FF', fontSize: 10.78, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}>Edit</div>
              </div>
            </div>
            <div style={{ width: 785, height: 0, border: '1px black solid' }}></div>
            <div style={{ width: 796, height: 101, position: 'relative' }}>
              <div style={{ left: 11, top: 0, position: 'absolute', color: '#172985', fontSize: 18, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Education</div>
              <div style={{ width: 328, height: 57, left: 14, top: 31, position: 'absolute' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>2024</div>
                <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>BSc(Hons) in Computer Science</div>
                <div style={{ width: 89, height: 16, left: 127, top: 41, position: 'absolute' }}>
                  <div style={{ width: 95, height: 16, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 5 }} />
                  <div style={{ left: 12, top: 0, position: 'absolute', color: '#1045FF', fontSize: 13, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Certificate.pdf</div>
                  <img style={{ width: 12, height: 12, left: 0, top: 2, position: 'absolute' }} src="https://via.placeholder.com/12x12" />
                </div>
                <div style={{ left: 127, top: 21, position: 'absolute', color: 'rgba(0, 0, 0, 0.70)', fontSize: 13, fontFamily: 'Inria Sans', fontWeight: '300', wordWrap: 'break-word' }}>Herald College Kathmandu</div>
              </div>
              <div style={{ width: 328, height: 57, left: 398, top: 31, position: 'absolute' }}>
                <div style={{ left: 0, top: 0, position: 'absolute', color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>2024</div>
                <div style={{ left: 127, top: 0, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>BSc(Hons) in Computer Science</div>
                <div style={{ width: 89, height: 16, left: 127, top: 41, position: 'absolute' }}>
                  <div style={{ width: 95, height: 16, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 5 }} />
                  <div style={{ left: 12, top: 0, position: 'absolute', color: '#1045FF', fontSize: 13, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Certificate.pdf</div>
                  <img style={{ width: 12, height: 12, left: 0, top: 2, position: 'absolute' }} src="https://via.placeholder.com/12x12" />
                </div>
                <div style={{ left: 127, top: 21, position: 'absolute', color: 'rgba(0, 0, 0, 0.70)', fontSize: 13, fontFamily: 'Inria Sans', fontWeight: '300', wordWrap: 'break-word' }}>Herald College Kathmandu</div>
              </div>
              <div style={{ width: 56.06, height: 23, left: 732, top: 6, position: 'absolute' }}>
                <div style={{ width: 56.06, height: 23, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 10.06 }} />
                <img style={{ width: 12.94, height: 12.94, left: 35, top: 3, position: 'absolute' }} src="https://via.placeholder.com/13x13" />
                <div style={{ left: 8, top: 5, position: 'absolute', color: '#1045FF', fontSize: 10.78, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}>Edit</div>
              </div>
            </div>
            <div style={{ width: 785, height: 0, border: '1px black solid' }}></div>
            <div style={{ width: 796, height: 115, position: 'relative' }}>
            <div>
  <div style={{ left: 11, top: 0, position: 'absolute', color: '#172985', fontSize: 18, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Office Information</div>
  <div style={{ left: 14, top: 31, position: 'absolute', display: 'flex', alignItems: 'center' }}>
    <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '65px', wordWrap: 'break-word' }}>Job Title:</div>
    <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Business Analyst</div>
  </div>
</div>

<div style={{ left: 398, top: 31, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '8px', wordWrap: 'break-word' }}>Employment Type:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Full Time</div>
</div>

              <div style={{ left: 14, top: 58, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '55px', wordWrap: 'break-word' }}>Start Date:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>March 24, 2024</div>
</div>

<div style={{ left: 398, top: 58, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '78px', wordWrap: 'break-word' }}>Branch:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Head Office</div>
</div>

              <div style={{ width: 56.06, height: 23, left: 732, top: 6, position: 'absolute' }}>
                <div style={{ width: 56.06, height: 23, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 10.06 }} />
                <img style={{ width: 12.94, height: 12.94, left: 35, top: 3, position: 'absolute' }} src="https://via.placeholder.com/13x13" />
                <div style={{ left: 8, top: 5, position: 'absolute', color: '#1045FF', fontSize: 10.78, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}>Edit</div>
              </div>
            </div>
            <div style={{ width: 785, height: 0, border: '1px black solid' }}></div>
            <div style={{ width: 796, height: 107, position: 'relative' }}>
              <div style={{ left: 11, top: 0, position: 'absolute', color: '#172985', fontSize: 18, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Family</div>
              <div style={{ left: 14, top: 30, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '35px', wordWrap: 'break-word' }}>Father Name:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Full Name</div>
</div>
<div style={{ left: 398, top: 30, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '30px', wordWrap: 'break-word' }}>Mother Name:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Mother Name</div>
</div>

              <div style={{ left: 14, top: 70, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '10px', wordWrap: 'break-word' }}>Family Members:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>4</div>
</div>

<div style={{ left: 398, top: 78, position: 'absolute', display: 'flex', alignItems: 'center' }}>
  <div style={{ color: '#8C8383', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '700', marginRight: '28px', wordWrap: 'break-word' }}>Family Contact:</div>
  <div style={{ color: 'black', fontSize: 15, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>98643555363</div>
</div>

              <div style={{ width: 56.06, height: 23, left: 732, top: 6, position: 'absolute' }}>
                <div style={{ width: 56.06, height: 23, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 10.06 }} />
            
                <div style={{ left: 8, top: 5, position: 'absolute', color: '#1045FF', fontSize: 10.78, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}>Edit</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ left: 177, top: 16, position: 'absolute', color: 'Blue', fontSize: 20, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Profile</div>
        <div style={{ left: 28, top: 12, position: 'absolute', color: 'rgba(0, 0, 0, 0.50)', fontSize: 24, fontFamily: 'Inria Sans', fontWeight: '700', wordWrap: 'break-word' }}>Dashboard &gt;</div>
        <div style={{ width: 995, height: 0, left: 28, top: 47, position: 'absolute', border: '1px black solid' }}></div>
      </div>
      <aside className="likelynav">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="Logo" />
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
            itemName="Attendance"
            icon="person_check"
            onSelect={()=>{}}
          />
          <NavItem
            itemName="Projects"
            icon="model_training"
            onSelect={() => {}}
          />
          <NavItem itemName="Payroll" icon="paid" onSelect={() => {}} />
          <NavItem itemName="Setting" icon="settings" onSelect={() => {}} />
          <NavItem itemName="Log out" icon="logout" onSelect={handleLogout} />
        </div>
      </aside>
   
 

      <div style={{ width: 1126, height: 109, left: 314, top: 1, position: 'absolute' }}>
        <div style={{ width: 42, height: 42, left: 717, top: 38, position: 'absolute', background: '#D9D9D9', borderRadius: 9999 }} />
        <div style={{ width: 252, height: 58, left: 799, top: 30, position: 'absolute' }}>
          <div style={{ left: 77, top: 0, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Aashish Thapa</div>
          <div style={{ width: 58, height: 58, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 9999, border: '1px black solid' }} />
          <img style={{ width: 22, height: 22, left: 230, top: 7, position: 'absolute' }} src="https://via.placeholder.com/22x22" />
          <div style={{ left: 77, top: 29, position: 'absolute', color: 'rgba(0, 0, 0, 0.50)', fontSize: 16, fontFamily: 'Inria Sans', fontWeight: '400', wordWrap: 'break-word' }}>Administrator</div>
          <div style={{ width: 11, height: 11, left: 189, top: 34, position: 'absolute' }}>
            <div style={{ width: 11, height: 11, left: 0, top: 0, position: 'absolute', background: '#00C608', borderRadius: 9999 }} />
            <div style={{ width: 4.40, height: 4.40, left: 3.30, top: 3.30, position: 'absolute', background: 'white' }}></div>
          </div>
        </div>
        <img style={{ width: 23, height: 23, left: 726, top: 47, position: 'absolute' }} src="https://via.placeholder.com/23x23" />
        <img style={{ width: 50, height: 50, left: 803, top: 34, position: 'absolute' }} src="https://via.placeholder.com/50x50" />
      </div>
    </div>
    
  );
};

export default Empdashboard;
