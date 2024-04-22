import React from 'react'
import deskbg from '../assets/desktopbg.jpg';
import { useNavigate } from "react-router-dom";


const StartSnap = () => {
    const Navigate = useNavigate()
  return (
    <div className="bg-cover h-screen flex flex-col justify-center items-center" style={{backgroundImage: `url(${deskbg})`}}>
        <h1 className='text-[#fee590] font-semibold text-[60px]'>खेल शुरू करें?</h1>
        <button className='bg-[#fee590] font-semibold text-xl text-[#311514] rounded-md px-6 py-2 mt-8' onClick={()=>{Navigate('/snapthebag')}}>Start</button>
    </div>
  )
}

export default StartSnap;