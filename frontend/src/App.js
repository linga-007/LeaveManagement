import './App.css';
// import EmployeeHomePage from './pages/Employee/EmployeeHome';
import AdminHome from './pages/Admin/AdminHome';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// import Login from './pages/User/Login'
// import Signup from './pages/User/Signup';
// import Profile from './pages/Employee/Profile';
import LandingPage from './pages/Landing/LandingPage';
import Thankyou from './pages/Thankyou/Thankyou';




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
      element:<LandingPage/>
    },
    {
      path:'/Admin',
      element:<AdminHome/>
    },
    {
      path:'/thankyou',
      element:<Thankyou/>
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
