import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import store from '../Store/Store';
import Sidebar from './Sidebar';
import './Rootlayout.css'

function RootLayout() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <div className="sidebar-container">
          <Sidebar />
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default RootLayout;
