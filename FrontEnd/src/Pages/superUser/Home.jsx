import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'

const SuperUser = () => {
  return (
    <div>
    <Navbar/>   
    <div className='grid grid-cols-12'>
    <Sidebar/>
       
   <div className='col-span-10'>
       <div className='flex justify-center mt-20'>
       <h1 className='bg-blue-400  text-white text-3xl mt-8 font-semibold mr-2 py-1 px-10 rounded-2xl tracking-wider'>
       SUPER-USER
       </h1>
      </div>
       <div className='flex justify-center gap-x-8'>
       <div className='bg-purple-500 w-0 px-0.5 mt-0.5 h-60 z-0'></div>
       <div className='bg-purple-500 w-0 px-0.5 relative  h-96 rotate-90 z-10'>
       <div className='bg-purple-500 w-0 px-0.5 rotate-90 mt-10 h-12 absolute top-80 left-6 '>
        </div>
        <div className='bg-purple-500 w-0 px-0.5 rotate-90 mb-10 h-12 absolute bottom-80 left-6 '>
        </div>
       </div>
       </div>
   </div>
</div>
   </div>
  )
}

export default SuperUser