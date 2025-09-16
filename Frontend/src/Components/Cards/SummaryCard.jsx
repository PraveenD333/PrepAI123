import React from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/healper';

const SummaryCard = ({colors,role,topicsToFocus,experience,questions,description,lastUpdated,onSelect,onDelete})=>{


    // bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500
  return <div className='rounded-xl p-[1px] cursor-pointer bg-gradient-to-tr from-indigo-600  to-purple-500  transition-transform transform hover:-translate-y-1 duration-300 ease-in-out hover:shadow-[0_3px_30px_rgba(255,_105,_180,_0.8)]'>
  <div onClick={onSelect} className='bg-black rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl relative group'>
    <div className='rounded-lg p-4 cursor-pointer relative' style={{backgroundColor:colors.bgcolor,}}>

      <div className='flex items-start'>
        <div className='flex-shrink-0 w-12 h-15 bg-black border border-purple-500 rounded-md flex items-center justify-center mr-4'>
          <span className='text-lg font-semibold text-white'>
            {getInitials(role)}
          </span>
        </div>

        {/* Content Container */}
        <div className='flex-grow'>
          <div className='flex justify-between items-center'>
            {/* Title and Skills */}
            <div>
              <h2 className='text-[17px] font-semibold text-white'>{role}</h2>
              <p className='text-xs text-medium text-white'>
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button className='flex items-center gap-2 text-lg text-red-600 font-medium bg-black px-3 py-1 rounded text-nowrap hover:border-red-600 cursor-pointer absolute top-0 right-0'
      onClick={(e)=>{e.stopPropagation();onDelete();}}>
        <LuTrash2/>
      </button>
    </div>

      <div className='px-3 pb-3'>
        <div className='flex items-center gap-3 mt-4'>
          <div className='text-[10px] font-medium text-white px-3 py-1 border-[0.5px] border-purple-500 rounded-full'>
            Experience :{experience} {experience == 1 ? "Year" : "Years"}
          </div>

          <div className='text-[10px] font-medium text-white px-3 py-1 border-[0.5px] border-green-500 rounded-full'>
          {questions} Q&A
          </div>

          <div className='text-[10px] font-medium text-white px-3 py-1 border-[0.5px] border-white rounded-full'>
            Last Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p className='text-[12px] text-gray-400 font-medium line-clamp-2 mt-3'>
          {description}
        </p>
      </div>
  </div>
  </div>

}

export default SummaryCard