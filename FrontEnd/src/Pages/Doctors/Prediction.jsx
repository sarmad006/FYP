import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'

const Prediction = () => {
  return (
    <div>
    <Navbar/>   
    <div className='grid grid-cols-12'>
    <Sidebar/>
       
   <div className='col-span-11 '>
       
       <div className='flex justify-between mt-8 ml-4'>
        <div className='mt-2'>
       <div className='bg-transparent  text-gray-200 text-sm rounded-md flex justify-around px-2.5 py-0.5 border-2 border-gray-200 '>
          <span className={`bg-green-500 mt-1.5 mr-2 w-2.5 h-2.5 rounded-full `}></span>
          <span className='font-semibold'>Cardiovascular Model</span>
        </div>
        </div>
       <div className='bg-blue-400  text-white text-2xl -ml-80 font-semibold mr-2 px-12 py-1 rounded-lg tracking-wider'>
       Prediction
       </div>
       <div>
        </div>
        </div>

        <div className='flex flex-col gap-y-4 justify-start   mt-20 mx-96 p-4 w-2/5'>
        <h3 className='text-3xl tracking-wider text-yellow-400 text-center font-semibold'>Alright DOC !</h3>
        <p className=' tracking-wider font-normal text-gray-100 text-xl text-start px-20'>According to the Data entered our Model <br></br> predicts that the Patient has <span className='text-fuchsia-500 font-medium'>Mild Symptoms</span> <br></br>  and you may <span className='text-fuchsia-500 font-medium'>Discharge</span>, with relevant Medical Prescription</p>
        </div>
        </div>
        </div>
        </div>
  )
}

export default Prediction