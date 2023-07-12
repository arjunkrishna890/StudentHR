import React from 'react';
import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const history  = useNavigate();
  const token = useSelector((state) => state.auth.token);
  return (
<>
{token?( <div className="sidebar">
    <h4 className="sidebar-title"><i>Dashboard</i></h4>
    <ul className="sidebar-menu"> <li className="sidebar-menu-item active" onClick={()=>history('/Dashboard')}>Home</li>   </ul>
  </div>):("")}
</>
   
     
      
  
  )
}

export default Sidebar