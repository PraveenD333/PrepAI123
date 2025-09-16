import React from 'react'

const DeleteAlertContent = ({content, onDelete}) => {
  return (
    <div className='p-5 bg-black rounded'>
        <p className='text-[14px] text-white'>{content}</p>

        <div className='flex justify-end mt-6'>
        <button  className='btn-small'
        type='button'
        onClick={onDelete}>
            Delete
        </button>
        </div>
    </div>
  )
}

export default DeleteAlertContent