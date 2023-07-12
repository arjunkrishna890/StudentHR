import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../Store/Store';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Rootlayout.css';


function RootLayout() {
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    setShowMainContent(true);
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Navbar className="navbar"/>
        <div className="sidebar-container">
          <Sidebar />
          <div className={`main-content ${showMainContent ? 'show' : ''}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default RootLayout;
