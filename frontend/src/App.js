import './App.css';
// import EmployeeHomePage from './pages/Employee/EmployeeHome';
import AdminHome from './pages/Admin/AdminHome';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// import Login from './pages/User/Login'
// import Signup from './pages/User/Signup';
// import Profile from './pages/Employee/Profile';
// import LandingPage from './pages/Landing/LandingPage';
import EmployeeHomePage from './pages/Employee/EmployeeHome';
import Login from './pages/User/Login';
import History from './pages/Employee/Components/History';
import Thankyou from './pages/Thankyou/Thankyou';



function App() {

  const route = createBrowserRouter([

    
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/Employee/',
      element:<EmployeeHomePage/>
    },
    {
      path:'/Admin',
      element:<AdminHome/>
    },
    {
      path:'/history/:id',
      element:<History/>
    },
    {
      path:'/thank-you',
      element:<Thankyou/>
    },
    
  ])

  return (
    <>
      <RouterProvider router={route}/>
      
    </>
  );
}
 
export default App;
