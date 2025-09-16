import React from 'react'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ value, onChange, label, placeholder, type }) => {

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return <div>
        <label className='text-[13px] text-white'>{label}</label>

        <div className='input-box'>
            <input
                className='w-full bg-black outline-none'
                type={type == "password" ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)} />

            {type === "password" && (
                <>
                    {showPassword ? (
                        <FaRegEye
                            className='text-green-500 cursor-pointer'
                            size={22}
                            onClick={() => toggleShowPassword()} />
                    ) : (<FaRegEyeSlash
                        className='text-gray-500 cursor-pointer'
                        size={22}
                        onClick={() => toggleShowPassword()} />
                    )}
                </>
            )}
        </div>
    </div>
}

export default Input