import React from 'react';
import { Button } from 'semantic-ui-react';
import useGoogleAccountsAPI from '../customhooks/useGoogleAccountsAPI';
import useAuthentication from '../customhooks/useAuthentication';
import jwt_decode from 'jwt-decode';
import './Navbar.scss'

const Navbar = () => {
  const { token, handleLogin, handleLogout,handleCallbackResponse } = useAuthentication();
  useGoogleAccountsAPI(handleCallbackResponse);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      </div>
      {token && (
        <div className='navbardesign'>
          <img src={jwt_decode(token).picture} className='logo' />
          <Button basic color='black' onClick={handleLogout}> Logout</Button>
        </div>
      ) || (
        <div className='navbardesign'>
          <Button basic color='black' onClick={handleLogin}>Login</Button>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
