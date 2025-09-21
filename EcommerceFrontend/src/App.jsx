import React from 'react'
import Registration from './Component/AuthComponent/Registration'
import Navbar from './Component/NavbarComponent/Navbar'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App