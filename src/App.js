import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route,Routes,Router} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Dashboard from './Components/Dashboard';
import Rootlayout from './Components/Rootlayout';


function App(){
const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" element={ <Rootlayout/>}>
    <Route path="/Dashboard" element={<Dashboard/>}></Route>
    </Route>
  </>
  
 
))

  return(
    <div >
     <RouterProvider router={router}/>
    </div>
   )
  
} 
 
    

export default App;







// const handleLogout = () => {
//   if (window.gapi && window.gapi.auth2) {
//     window.gapi.load('auth2', () => {
//       window.gapi.auth2.init({
//         client_id: '298190749020-jbmufb0osmmv0l355e2s269kaqareki3.apps.googleusercontent.com'
//       }).then(() => {
//         var auth2 = window.gapi.auth2.getAuthInstance();
//         if (auth2) {
//           auth2.signOut().then(() => {
//             console.log('User signed out.');
//           }).catch((error) => {
//             console.log('Error occurred during sign out:', error);
//           });
//         } else {
//           console.log('Auth instance is not available.');
//         }
//       }).catch((error) => {
//         console.log('Error occurred during initialization:', error);
//       });
//     });
//   } else {
//     console.log('Google API client library is not loaded.');
//   }
// };