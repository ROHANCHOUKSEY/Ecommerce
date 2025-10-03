import React, { createContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const { isLoggined } = createContext(AdminContext);

    return isLoggined ? <Outlet /> : <Navigate to="/adminlogin" replace />;
}

export default ProtectedRoute