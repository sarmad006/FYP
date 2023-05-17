import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
const HospitalAggregate = () => {


    return (
        <div>
            <Navbar/>
            <div className="grid grid-cols-12 mb-10">
                <Sidebar/>
                <div className="col-span-10">
                    <div className="flex justify-center flex-col items-center space-y-40">
                        <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-white text-2xl mt-8 font-light mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
                            Aggregate Model
                        </div>
                        <div>
                            <button className="text-white bg-borderPurple p-3 rounded-full">
                                Aggregate Model
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalAggregate
