import React from 'react'

const Registration = () => {
    return (
        <>
            <div className='md:min-h-screen flex justify-center items-center m-5'>
                <div className='w-full md:w-100 border-2 border-gray-700 rounded-2xl'>
                    <div className='flex flex-col justify-center mt-5'>
                        <h1 className='text-2xl font-bold text-center'>𝖱𝖤𝖦𝖨𝖲𝖳𝖱𝖠𝖳𝖨𝖮𝖭</h1>
                        <div className='flex flex-col justify-center px-4 md:px-10 py-4 md:py-6 gap-6'>
                            <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="firstname" type="text" placeholder='First Name' />
                            <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="lastname" type="text" placeholder='Last Name' />
                            <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="email" type="email" placeholder='Email' />
                            <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="password" type="password" placeholder='Password' />
                            <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="conform_password" type="password" placeholder='Conform Password' />
                            <div className='flex justify-center'>
                                <button className='flex justify-center border-2 border-gray-600 rounded-2xl focus:outline-0 p-3 w-40 cursor-pointer'>Registered</button>
                            </div>
                        </div>
                    </div>
                </div>x 
            </div>
        </>
    )
}

export default Registration 