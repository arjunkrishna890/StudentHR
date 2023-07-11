import { useDispatch } from 'react-redux';
import { setToken, removeToken } from '../Store/AuthSlice';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './LoginPage.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
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
    <div className="App">
       <div className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item active">Home</li>
          <li className="sidebar-menu-item">Profile</li>
          <li className="sidebar-menu-item">Settings</li>
          <li className="sidebar-menu-item">Logout</li>
        </ul>
      </div>
      <div className="signInDiv">
        <h2>Login with google </h2>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
