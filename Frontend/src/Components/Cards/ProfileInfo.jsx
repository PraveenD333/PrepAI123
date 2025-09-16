import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {

    const {user, clearUser}=useContext(UserContext);
    const navigate=useNavigate();

    const handelLogout =()=>{
        localStorage.removeItem("token")
        navigate("/")
    };
  return (
    user && (
    <div className='flex items-center'>
        <img src={user.profileImageUrl} alt="" 
        className='w-11 h-11 bg-gray-300 rounded-full mr-3'/>

        <div>
            <div className='text-[15px] text-white font-bold leading-3'>
                {user.name || ""}
            </div>

            <button 
            onClick={handelLogout} 
            className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline'>
                Logout
            </button>
        </div>
    </div>
    )
  )
}

export default ProfileInfo