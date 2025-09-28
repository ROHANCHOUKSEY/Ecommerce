import React, { useState } from 'react'

const ImageUpload = () => {

    // const { image, setImage } = useState({
    //     image: ""
    // });

    // const handleFileChange = (e) => {
    //     setImage(e.target.file[0]);
    // }


    // const handleUploadImage = async (e) => {
        
    //     const response = await fetch("http://localhost:3002/imgupload", {
    //         method:"POST",
    //         credentials:"include",
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify()
    //     })
    //     const data = await response.json();
    //     if(!response.ok){
    //         throw data
    //     }
    //     return data;
    // }

    return (
        <>
            {/* <div className="flex flex-row">
                <input type="file" accept="image/*" multiple id='image-upload' name="image" value={imageUpload.image} onChange={handleFileChange} />
            </div> */}
        </>
    )
}

export default ImageUpload