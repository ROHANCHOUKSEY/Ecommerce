import React from 'react'
import ImageUpload from './ImageUpload'

const AddItem = () => {
    return (
        <>
            <div className='p-10 border-2 border-gray-200 w-full'>
                <div className='flex flex-col gap-5'>
                    <h1>Upload Image</h1>
                    <ImageUpload/>
                </div>
            </div>
        </>
    )
}

export default AddItem