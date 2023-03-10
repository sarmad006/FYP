import React from 'react'
import "./index.css"
import {AiOutlineHome} from 'react-icons/ai'
import {RiFileCloudLine} from 'react-icons/ri'
import {MdOutlineFileUpload} from 'react-icons/md'

//918dec bg color
const Sidebar = () => {
  return (
    <div className="sidebarDiv">  
       <ul className="sidebarDivul">
          <li className='sidebarDivLi'>
          <AiOutlineHome fontSize={20}/>
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">Home</a>
          </li>
          <li className='sidebarDivLi'>
            <RiFileCloudLine fontSize={20}/>
            <a href="http://localhost:3000/recep/retrieveModel" target="" rel="noopener noreferrer">Retrive Model </a>
          </li>
          <li className='sidebarDivLi'>
          <MdOutlineFileUpload fontSize={20}/>
          <a href="http://" target="http://localhost:3000/recep/UploadModel" rel="noopener noreferrer">Upload Model </a>
          </li>
       </ul>
    </div>    
  )
}

export default Sidebar


// eslint-disable-next-line no-lone-blocks
{/* <aside class="w-28 " aria-label="Sidebar">
    <div class="overflow-y-auto pb-60 pt-20 bg-purple rounded-3xl mx-4">
       <ul class="space-y-8 text-white">
          <li className='sideabar_li flex justify-center'>
            <span>Home</span>
          </li>
          <li className='sideabar_li flex justify-center'>
            <span>Retrive Model</span>
          </li>
          <li className='sideabar_li flex justify-center'>
            <span>Upload Model</span>
          </li>
          <li className='sideabar_li flex justify-center'>
            <span>FUck</span>
          </li>
          <li className='sideabar_li flex justify-center'>
            <span>Home</span>
          </li>
         
       </ul>
    </div>
 </aside> */}