import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route,Routes,Router} from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
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







