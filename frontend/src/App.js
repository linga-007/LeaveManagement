import './App.css';
// import EmployeeHomePage from './pages/Employee/EmployeeHome';
import AdminHome from './pages/Admin/AdminHome';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// import Login from './pages/User/Login'
// import Signup from './pages/User/Signup';
// import Profile from './pages/Employee/Profile';
import LandingPage from './pages/Landing/LandingPage';
import EmployeeHomePage from './pages/Employee/EmployeeHome';
import Login from './pages/User/Login';




function App() {

  const route = createBrowserRouter([

    // {
    //   path:'/',
    //   element:<Login/>
    // },
    // {
    //   path:'/login',
    //   element:<Login/>
    // },
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/Employee/:id',
      element:<EmployeeHomePage/>
    },
    {
      path:'/Admin',
      element:<AdminHome/>
    },
    // {
    //   path:'/Employee/:username',
    //   element:<EmployeeHomePage/>
    // },
    // {
    //   path:'/Landing',
    //   element:<LandingPage/>
    // },
    // {
    //   path:'/EmpProfile/:username',
    //   element:<Profile />
    // },
    // {
    //   path:'/AdProfile/:username',
    //   element:<AdmProfile />
    // },
  ])

  return (
    <>
      <RouterProvider router={route}/>
      
    </>
  );
}
 
export default App;
