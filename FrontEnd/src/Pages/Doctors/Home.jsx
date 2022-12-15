import React from 'react'
import Model from '../../Components/Doctor/Models/Model'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'


const Home = () => {
  return (
    <div>
     <Navbar/>   
     <div className='grid grid-cols-12'>
     <Sidebar/>
        
    <div className='col-span-10'>
        <div className='flex justify-center'>
        <div className='bg-blue-400  text-white text-2xl mt-8 font-semibold mr-2 px-12 py-1 rounded-lg tracking-wider'>
        Available Models
        </div>
        </div>
        <div className='grid grid-cols-3 gap-10  mt-12 px-40'>
         <Model/>       
       </div>
    </div>
</div>
    </div>
  )
}

export default Home