import React from 'react'

const Registered = ({name,location}) => {
  return (
    <>
    {name==="Muhammad Khizer Jilani" ? "" :(

    
    <div className='border-4 border-indigo-300  rounded-2xl px-6 py-4'>
    <div className='flex justify-between items-center '>
      <h2 className='text-gray-200 text-2xl tracking-widest w-96 font-poppins'>{name}</h2>
      <svg xmlns="http://www.w3.org/2000/svg" width="537.1" height="1" viewBox="0 0 537.1 1">
      <path id="Path_39" data-name="Path 39" d="M719,1584h537.1" transform="translate(-719 -1583.5)" fill="none" stroke="#918DEC" stroke-width="1"/>
      </svg>
     <p className='text-center text-md  text-gray-200 tracking-widest mx-4 font-poppins'>{location}</p>
     <svg xmlns="http://www.w3.org/2000/svg" width="537.1" height="1" viewBox="0 0 537.1 1">
      <path id="Path_39" data-name="Path 39" d="M719,1584h537.1" transform="translate(-719 -1583.5)" fill="none" stroke="#918DEC" stroke-width="1"/>
      </svg> 
  
      <button className='text-sm rounded-2xl py-1 px-4 mx-2 font-semibold bg-slate-100 font-poppins'>Details</button>
    </div>
   
   </div>
    )}
   </>
  )
}

export default Registered