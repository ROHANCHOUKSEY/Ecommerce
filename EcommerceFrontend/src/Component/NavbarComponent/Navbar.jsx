import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../Context/ContextProvider';

const Navbar = () => {

  const navigate = useNavigate();
  const { isLoggined, setIsLoggined } = useContext(AppContext);

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


  return (
    <>
      {isLoggined ? <div className='flex justify-between p-5'>
        <h1>Home</h1>
        <div>
          <button onClick={handleUserLogOut} className='text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md cursor-pointer'>Log Out</button>
        </div>
      </div> : ""}

    </>
  )
}

export default Navbar; 