import React from 'react' 

const RoleInfoHeadre = ({ role, topicsToFocus, experience, questions, description, lastUpdated }) => {
  return (
    <div className='bg-black relative'>
      <div className='mx-auto px-4'>

        {/* Centered & Constrained Width Card */}
        <div className='max-w-lg'>
          <div className='rounded-xl p-[1px] bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500'>
            <div className='bg-black rounded-xl relative overflow-hidden h-[200px] flex flex-col justify-center px-5'>

              <div className='flex items-start'>
                <div className='flex-grow'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h2 className='text-3xl text-white font-medium'>{role}</h2>
                      <p className='text-sm text-medium font-semibold text-white mt-1'>{topicsToFocus}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-2 mt-3 ml-[-10px]'>
                <div className='text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full'>
                  Experience: {experience} {experience === 1 ? "Year" : "Years"}
                </div>
                <div className='text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full'>
                  {questions} Q&A
                </div>
                <div className='text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full'>
                  Last Updated: {lastUpdated}
                </div>
              </div>

              <div className='text-[12px] w-[310px] -ml-2.5 relative font-semibold text-white bg-black px-3 py-1 rounded-full mt-2'>
                Description: {description}
              </div>

            </div>
          </div>
        </div>

        {/* Background Animation */}


      </div>
    </div>
  )
}

export default RoleInfoHeadre
