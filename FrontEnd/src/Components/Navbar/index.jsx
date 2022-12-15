import React from 'react'
import Tags from '../Tags'

const Navbar = () => {
  return (
    <nav class="p-3 border-gray-200 rounded-xl bg-violet-400 py-4  my-4 mx-4 px-12 ">
  <div class="flex flex-wrap items-center justify-between my-1 w-full ">
    <div className='flex  justify-between gap-x-4'>
        <Tags color="pink-500" text="Doctor"/>
        <Tags color="pink-500" text="AKUH"/>
    </div>
    <div className='text-center'>
      <h1 className='font-medium text-gray-100 text-2xl tracking-widest '>DEDOC</h1>
    </div>
    <div className='flex   gap-x-4  w-60'>
      <button className='text-gray-100 mr-4 bg-transparent border-0 focus:outline-none rounded-lg text-sm'>Logout</button>
   
    
      <input type="image" src="./metamask.svg" height="30" width="30"/>
 
      <span className="bg-green-400 mt-3  w-2.5 h-2.5 rounded-full" ></span>   
    </div>
    
  </div>
  
</nav>
  )
}

export default Navbar