import React from 'react'
import Navbar from './Component/Navbar_FooterComponent/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './Component/SideBarComponent/Sidebar'
import AdminRegistration from './Component/AdminAuthenticationComponent/AdminRegistration'

const App = () => {
  return (
    <>
      <Navbar />
      {/* <div className='flex flex-row'>
        <Sidebar />
        <Outlet />  
      </div>  */}
      <Outlet/>
    </>
  )
} 

export default App