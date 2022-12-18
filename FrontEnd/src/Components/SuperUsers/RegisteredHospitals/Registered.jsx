import React from 'react'

const Registered = ({name,location}) => {
  return (
    <div className='border-4 border-emerald-500 relative rounded-2xl py-4 px-6'>
    <div className='flex justify-between '>
      <h2 className='text-gray-200 text-2xl tracking-widest w-80'>{name}</h2>
      <div className='flex justify-end w-80 mr-5'>
       <p className='text-center pt-1 text-md  text-gray-200 tracking-widest'>{location}</p>
      
      </div>
      <button className='text-sm rounded-2xl py-0 px-8 font-medium'>Details</button>
    </div>
    <div style={{padding:"1px"}} className='absolute bg-emerald-400 ml-20 w-0  h-64 rotate-90 -bottom-24 left-80'>
      
    </div>
    <div style={{padding:"1px",height:"36rem"}} className='absolute bg-emerald-400 mr-28 w-0 rotate-90 -top-64 right-80'>
      
      </div>
   </div>
  )
}

export default Registered