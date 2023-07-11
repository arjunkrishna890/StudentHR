import React from 'react';
import './Navbar.scss';
import { useDispatch } from 'react-redux';
import { setToken, removeToken } from '../Store/AuthSlice';
import { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import './LoginPage.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const history = useNavigate();

  const handleCallbackResponse = (response) => {
    dispatch(setToken(response.credential));
    history('/Dashboard'); 
  };
  
  const handleLogin = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    }
  };

  const handleLogout = () => {
    dispatch(removeToken());
    history('/')
    clearCache();
  };

  // Clear cookies
  // Clear history
  const clearCache = () => {
    window.history.replaceState(null, '', '/');

    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  };

  useEffect(() => {
    const initializeGoogleAPI = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: '298190749020-jbmufb0osmmv0l355e2s269kaqareki3.apps.googleusercontent.com',
          callback: handleCallbackResponse,
        });
      }
    };


    if (window.google && window.google.accounts && window.google.accounts.id) {
      initializeGoogleAPI();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleAPI;
      document.head.appendChild(script);
    }
  }, []);



  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-text"> <h2 className="sidebar-title">StudentHR</h2></span>
      </div>
     
      {token ? (
        <div style={{display:"flex",justifyContent:"space-around"}}>
        <img src={jwt_decode(token).picture} style={{width:"30px",height:"30px",borderRadius:"50%",border:"2px solid white",marginRight:"2rem"}}/>
          <Button basic color='black' onClick={handleLogout}>Logout</Button>
        </div>
          
        ) : (
          <Button basic color='black' onClick={handleLogin}>Login</Button>
        )}
    </nav>
  );
};

export default Navbar;
