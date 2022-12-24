import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Registered from '../../Components/SuperUsers/RegisteredHospitals/Registered'

const RegisteredHospitals = () => {

    const [RegisteredH,setRegisteredH]=useState([
        {
            name:"AKU Hospital",
            location:"Karachi"
        },
        {
            name:"Liaquat Hospital",
            location:"Karachi"
        },
        {
           name:"Bloomsbury Hospital",
           location:"London"
        },
        {
           name:"SKMH",
           location:"Lahore"
        },
        {
           name:"Lincoln Hospital",
           location:"NewYork"
        }
    ])

  return (
    <div>
    <Navbar/>   
    <div className='grid grid-cols-12 '>
    <Sidebar/>
       
   <div className='col-span-10 px-4 mb-8'>
       <div className='flex justify-center mt-6 mb-10'>
       <h1 className='bg-indigo-300  text-white text-3xl font-thin font-poppins py-1.5 px-5 rounded-3xl tracking-widest'>
       Registered Hospitals
       </h1>
       </div>
       <div className='flex flex-col gap-y-10 '>
        {RegisteredH.map((hospital)=>(
            <Registered name={hospital.name} location={hospital.location}/>
        ))}
        
       </div>
       </div>
       </div>
       </div>
  )
}

export default RegisteredHospitals