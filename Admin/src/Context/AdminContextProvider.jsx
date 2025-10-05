import React, { useEffect, useState } from 'react'
import { AdminContext } from './AdminContext';

const AdminContextProvider = (props) => {

  const [isLoggined, setIsLoggined] = useState(() => {
    const checkLogin = localStorage.getItem("isloggined");
    return checkLogin === "true"
  });

  useEffect(() => {
    localStorage.setItem("isloggined", isLoggined)
  }, [isLoggined]);

  return (
    <AdminContext.Provider value={{ setIsLoggined, isLoggined }}>
      {props.children}
    </AdminContext.Provider> 
  )
}

export default AdminContextProvider