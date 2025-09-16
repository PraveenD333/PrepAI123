import React, { useRef, useState } from 'react'
import {LuUser, LuUpload,LuTrash} from 'react-icons/lu'

const ProfilePic = ({image,setImage,preview,setPreview}) => {

    const inputRef=useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange = (event)=>{
        const file =event.target.files[0];
        if(file){
            // Update The Image State
            setImage(file)

            // Generate preview URL from the file
            const preview=URL.createObjectURL(file);
            if(setPreview){
                setPreview(preview)
            }
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage=()=>{
        setImage(null);
        setPreviewUrl(null);

        if(setPreview){
            setPreview(null)
        }
    }

    const onChooseFile=()=>{
        inputRef.current.click()
    }
  return <div className='flex justify-center mb-6'>
    <input
    className='hidden'
    onChange={handleImageChange}
    type='file'
    accept='image/*'
    ref={inputRef}/>

    {!image ?(
        <div className='w-20 h-20 flex items-center justify-center bg-black border-2 border-purple-500  rounded-full relative cursor-pointer'>
            <LuUser className='text-4xl text-purple-500'/>

            <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-indigo-600  to-purple-500   text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
            onClick={onChooseFile}>
                <LuUpload/>
            </button>
        </div>
    ):(
        <div className='relative'>
            <img src={preview || previewUrl} 
            alt="Profile Photo"
            className='w-20 h-20 rounded-full object-cover'/>

            <button className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' 
            type='button'
            onClick={handleRemoveImage}>
                <LuTrash/>
            </button>
        </div>
    )}
  </div>
}

export default ProfilePic