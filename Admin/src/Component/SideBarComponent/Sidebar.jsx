import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className='w-75 h-screen shadow-md'>
                <div className='flex flex-col py-10 gap-10'>
                    <div className='bg-green-300 w-full p-5'> 
                        <NavLink to="/additem"><p>Add Items</p></NavLink>
                    </div>
                    <div className='bg-green-300 w-full p-5'>
                        <NavLink to="/listitem"><p>List Items</p></NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar