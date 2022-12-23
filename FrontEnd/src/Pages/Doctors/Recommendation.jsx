import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import Tags from '../../Components/Tags'

const Recommendation = () => {

  const [labels,setLabels]=useState([
    {
    title:"Blood Pressure",
    },
    {
      title:"Age"
    },
    {
       title:"Oxygen Level"
    },
    {
      title:"Blood Platellete"
    },
    {
      title:"Weight"
    },
    {
      title:"Diabetic"
    },
    {
     title:"Chloestrole"
    },
    {
     title:"Hemoglobin"
    },
    {
     title:"Pulse Count"
    }
  ])

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
       Recommendation
       </div>
       <div>

       </div>
       </div>
       <div className='flex flex-col gap-y-4 justify-start border-4 border-violet-500 rounded-2xl shadow-2xl  mt-12 mx-96 p-4 w-2/5'>
        <div className='flex w-full bg-gray-200 px-2 py-1 rounded-xl'>
         <p className="text-lg tracking-widest">Hi Doc ! , kindly Enter the Details for Predictions</p>
        </div>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-4 mx-4">
          {labels.map((item)=>(

          <div className='flex flex-col justify-center items-center'>
            <label for="first_name" class="block mb-2 text-sm  text-white">{item.title}</label>
            <div className='border-2 border-violet-500 border-b-0 p-2 rounded-xl shadow-2xl'>
            <input type="text" id="first_name" class="bg-transparent w-32 border-b-2 border-darkPurple " required/>
            </div>
        </div>
         ))}
        </div>
        <div className='flex justify-end my-4 '>
     <button className=' bg-yellow-300 rounded-md text-sm px-6 py-1 font-semibold shadow-2xl'>PREDICT</button>
    </div>
       </div>
   </div>
</div>
   </div>
  )
}

export default Recommendation