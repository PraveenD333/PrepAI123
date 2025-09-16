import React from 'react'
import { IoClose } from 'react-icons/io5';

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
    if(!isOpen) return null;

    return ( 
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
        {/* Modal Contant */}
        <div className={`relative flex flex-col bg-black shadow-lg rounded overflow-hidden`}>
            {/* modal Header */}
            {!hideHeader &&(
                <div className='flex items-center justify-between p-4 border-b  border-gray-800'>
                    <h3 className='md:text-lg font-medium text-white'>{title}</h3>
                </div>
            )}
            <button
            onClick={onClose}
            type='button'
            className='text-white bg-transparent  hover:text-rose-500 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer'>
            <IoClose size={24}/>
            </button>

        {/* Modal body scrollable */}
        <div className='flex-1 overflow-y-auto custom-scrollbar'>
            {children}
        </div>

       </div>
    </div>
)
}

export default Modal