import React,{useEffect} from 'react'
import thank from '../assets/thank.jpg'
import deskbg from '../assets/Websitebg.jpg';
import { useNavigate } from "react-router-dom";

const Thank = () => {
  const Navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        Navigate("/"); // If userId exists, navigate to home page
      }
    }, []);
  return (
    <div className="bg-cover h-screen" style={{backgroundImage: `url(${deskbg})`}}>
      <div className='flex flex-col justify-center items-center h-screen w-full'>
        <h1 className='text-[60px] text-[#fee590]'>Thank You!</h1>

        <button onClick={()=>{Navigate('/home')}} className='bg-[#fee590] text-[#321615] px-4 py-2 mt-5 text-2xl font-semibold'>Home</button>
      </div>
    </div>
  )
}

export default Thank;