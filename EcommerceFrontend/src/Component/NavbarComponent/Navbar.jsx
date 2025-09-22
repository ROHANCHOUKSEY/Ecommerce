import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from '../../Context/AppContext';
import { Bubbles, MenuIcon, X } from "lucide-react"

const Navbar = () => {

  const navigate = useNavigate();
  const { isLoggined, setIsLoggined } = useContext(AppContext);
  const [sideBar, setSideBar] = useState(() => {
    const isSidebar = localStorage.getItem("sidebar");
    return isSidebar ? isSidebar : false
  });

  useEffect(() => {
    localStorage.setItem("sidebar", sideBar);
  }, [sideBar])

  const handleUserLogOut = async () => {

    try {
      const response = await fetch("http://localhost:3002/user/userLogout", {
        method: "POST",
        credentials: "include"
      })
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setIsLoggined(false);
      navigate("/userLogin");

      return data;
    } catch (error) {
      console.log("user not logout:", error);
    }
  }

  const handleSideBar = () => {
    setSideBar(!sideBar);
  }


  return (
    <>
      {isLoggined && (<><div className={`overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between p-5 shadow-md shadow-gray-500 z-10 ${sideBar ? "fixed h-full w-48" : "hidden"} md:flex md:h-20 md:w-full md:static`}>
        <h1 className='text-base font-bold'>Ecommerce</h1>
        <div className='flex flex-col md:flex-row md:items-center gap-15'>
          <NavLink><p className='w-20 text-center bg-red-700 p-4 rounded-md text-white'>Kids</p></NavLink>
          <NavLink><p>Mens</p></NavLink>
          <NavLink><p>Womens</p></NavLink>
          <NavLink><p>Footwear</p></NavLink>
          <button onClick={handleUserLogOut} className='text-white w-20 bg-blue-500 hover:bg-blue-600 p-2 rounded-md cursor-pointer'>Log Out</button>
        </div>
      </div>
        {sideBar ? <div className='absolute md:hidden  w-full flex justify-end px-3 py-3 z-20' onClick={handleSideBar}><X /></div> : <div className='absolute md:hidden  w-full flex justify-end px-3 py-3 z-20'><MenuIcon onClick={handleSideBar} /></div>}</>)}
    </>
  )
}

export default Navbar; 