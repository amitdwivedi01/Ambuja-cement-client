import React,{useEffect} from 'react'
import deskbg from '../assets/Websitebg.jpg';
import { useNavigate } from "react-router-dom";


const StartQuiz = () => {
  const Navigate = useNavigate();
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const isquiz = localStorage.getItem('quiz');
    if (!userId) {
      Navigate("/"); // If userId exists, navigate to home page
    }
    if(isquiz){
      Navigate('/home')
    }
  }, []);
  return (
    <div className="bg-cover h-screen flex flex-col justify-center items-center" style={{backgroundImage: `url(${deskbg})`}}>
        <h1 className='text-[#fee590] font-semibold text-[60px]'>खेल शुरू करें?</h1>
        <button className='bg-[#fee590] font-semibold text-xl text-[#311514] rounded-md px-6 py-2 mt-8' onClick={()=>{Navigate('/quiz')}}>Start</button>
    </div>
  )
}

export default StartQuiz