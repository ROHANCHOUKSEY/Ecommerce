import React, { useState } from 'react'
import { AdminContext } from './ContextProvider'

const AdminContextProvider = () => {

  const[isLoggined, setIsLoggined] = useState(null);

  return (
    <AdminContext.Provider>
    
    </AdminContext.Provider>
  )
}

export default AdminContextProvider