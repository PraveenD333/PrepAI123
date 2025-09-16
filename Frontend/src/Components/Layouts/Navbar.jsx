import React from 'react'
import Profileinfo from '../Cards/ProfileInfo'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='h-18 bg-black py-2.5 px-5 md:px-0 sticky top-0 z-30'>
      <div className='container mx-auto flex item-center justify-between gap-5'>
        <Link to="/">
        <h2 className='text-3xl md:text-3xl py-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500  to-purple-600 font-bold leading-5'>
            Prep AI
        </h2>
        </Link>

        <Profileinfo/>
      </div>
    </div>
  )
}

export default Navbar