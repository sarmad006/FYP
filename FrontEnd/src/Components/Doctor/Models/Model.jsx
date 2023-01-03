import React, { useState } from 'react'
import './Model.css'


const Model = () => {

    const [models,setModels]=useState([
    {
     name:"Cardiovascular",
     status:"Accessible",
     accuracy:"86 %",
     Models:"3"
    },
    {
      name:"LUNGS Disease",
      status:"Accessible",
      accuracy:"82 %",
      Models:"3"
     },
     {
      name:"Infectious Disease",
      status:"Requested",
      accuracy:"85 %",
      Models:"3"
     },
     {
        name:"DIABETIES",
        status:"Requested",
        accuracy:"85 %",
        Models:"3"
       },
       {
        name:"Dengue Virus",
        status:"No Access",
        accuracy:"85 %",
        Models:"3"
       },
       {
        name:"Covid-19",
        status:"Requested",
        accuracy:"85 %",
        Models:"3"
       },

])
  return (
    <>
    {models.map((model)=>(
 <div className=" md:grid  flex max-w-sm py-2 px-1 bg-transparent border-4 border-darkPurple rounded-2xl shadow-2xl lg:block box1">
  <div className='flex flex-col gap-y-2 font-poppins'>
    <h5 class="mb-2 mx-10 text-xl  text-white  border-b-4 border-lime-500 text-center">{model.name}</h5>
    <div className='flex gap-x-2 justify-center text-white px-2'>
      <p className='lg:text-lg'> Status : </p>
      <p className=' lg:text-lg '> {model.status} </p>
    </div>
    <div className='flex gap-x-2 justify-center text-white px-2'>
      <p className=' lg:text-lg '> Accuracy : </p>
      <p className=' lg:text-lg '> {model.accuracy}</p>
    </div>
    <div className='flex gap-x-2 justify-center text-white px-2'>
      <p className=' lg:text-lg '> Models Combined : </p>
      <p className=' lg:text-lg '> {model.Models} </p>
    </div>
    <div className='flex justify-center mb-2  mt-4'>
     <button className=' bg-yellow-300 rounded-full text-sm px-8 py-0.5 btn-model '>USE</button>
    </div>
    </div>
</div>
 ))}
</>
  )
}

export default Model