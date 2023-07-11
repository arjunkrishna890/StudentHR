import React from 'react';
import './Sidebar.scss'

function Sidebar() {
  return (
    <div className="sidebar">
    <h4 className="sidebar-title"><i>Dashboard</i></h4>
    <ul className="sidebar-menu">
      <li className="sidebar-menu-item active">Home</li>
      <li className="sidebar-menu-item">Profile</li>
      <li className="sidebar-menu-item">Settings</li>
      <li className="sidebar-menu-item">Logout</li>
    </ul>
  </div>
  )
}

export default Sidebar