import React, { useContext } from 'react'
import Navbar from './Component/Navbar_FooterComponent/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './Component/SideBarComponent/Sidebar'
import AdminRegistration from './Component/AdminAuthenticationComponent/AdminRegistration'
import { AdminContext } from './Context/AdminContext'

const App = () => {

  const { isLoggined } = useContext(AdminContext);
  
  return (
    <>
      <Navbar />
      {isLoggined ? (<div className='flex flex-row'>
        <Sidebar />
      </div>) : (<Outlet/>)}
      
    </>
  )
}

export default App
