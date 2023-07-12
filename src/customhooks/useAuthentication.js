import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setToken, removeToken } from '../Store/AuthSlice';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    dispatch(setToken(response.credential));
    window.location.href = '/dashboard'; // Navigate to the '/dashboard' route and reload the page
  };

  const handleLogin = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    }
  };
  
  const handleLogout = () => {
    dispatch(removeToken());
    navigate('/'); // Navigate to the root route ('/')
  };

  return { token, handleCallbackResponse, handleLogin, handleLogout };
};

export default useAuthentication;
