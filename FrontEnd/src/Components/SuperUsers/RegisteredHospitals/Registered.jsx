import React from 'react'

const Registered = ({name,location}) => {
  return (
    <div className='border-4 border-emerald-500  rounded-2xl px-6 py-4'>
    <div className='flex justify-between items-center '>
      <h2 className='text-gray-200 text-2xl tracking-widest w-80'>{name}</h2>
      <svg xmlns="http://www.w3.org/2000/svg" width="537.1" height="1" viewBox="0 0 537.1 1">
      <path id="Path_39" data-name="Path 39" d="M719,1584h537.1" transform="translate(-719 -1583.5)" fill="none" stroke="#56f9b2" stroke-width="1"/>
      </svg>
     <p className='text-center text-md  text-gray-200 tracking-widest mx-4'>{location}</p>
     <svg xmlns="http://www.w3.org/2000/svg" width="537.1" height="1" viewBox="0 0 537.1 1">
      <path id="Path_39" data-name="Path 39" d="M719,1584h537.1" transform="translate(-719 -1583.5)" fill="none" stroke="#56f9b2" stroke-width="1"/>
      </svg> 
  
      <button className='text-sm rounded-2xl py-0 px-8 mx-0.5 font-medium'>Details</button>
    </div>
   
   </div>
  )
}

export default Registered