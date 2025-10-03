import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { AdminContext } from '../../Context/AdminContext';

const Navbar = () => {

    const { logoutError, setLogoutError } = useState("");

    const { setIsLoggined, isLoggined } = useContext(AdminContext);

    const navigate = useNavigate();

    const handleAdminLogout = async () => {
        try {
            const response = await fetch("http://localhost:3002/admin/adminLogout", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            })

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            setIsLoggined(false);
            navigate("/adminlogin");
            return data;
        } catch (error) {
            if (error.message) {
                setLogoutError(error.message);
            } else {
                console.log("failed to admin logout: ", error);
            }
        }

    }

    return (
        <>
            {isLoggined ? (<div className='w-full h-20 bg-white shadow-lg'>
                <div className='flex justify-between align-middle px-10 items-center h-full'>
                    <div>
                        <h1>Company Logo</h1>
                    </div>
                    <div>
                        <h1>user name</h1>
                    </div>
                    <div>
                        <NavLink to="/adminregistration"><p onClick={handleAdminLogout}>Logout</p></NavLink>
                    </div>
                </div>
            </div>) : (<div className='w-full h-20 bg-white shadow-lg'>
                <div className='flex justify-between align-middle px-10 items-center h-full'>
                    <div>
                        <h1>Company Logo</h1>
                    </div>
                    <div>
                        <h1>user name</h1>
                    </div>
                    <div>
                        <NavLink to="/adminregistration"><p>SignUp</p></NavLink>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Navbar