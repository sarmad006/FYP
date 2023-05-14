import React from 'react'

const Tags = ({text,color}) => {
  return (
    <div className='bg-transparent  text-gray-200 text-sm rounded-xl flex justify-around px-2.5 py-0 border-2 border-gray-200 '>
          <span className={` mt-1.5 mr-2 w-2.5 h-2.5 rounded-full `} style={{background:color}}></span>
          <span className='font-semibold'>{text}</span>
        </div>
  )
}

export default Tags