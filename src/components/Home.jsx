import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import deskbg from '../assets/desktopbg.jpg';
import mobbg from '../assets/mobilebg.jpg';
import quizimg from '../assets/1.png';
import upload from '../assets/5.png';
import snapthebag from '../assets/2.png'
import imageupload from '../assets/3.png'
import imageorvideo from '../assets/4.png';
import logo from '../assets/logo2.png'

const Home = () => {
  const Navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        Navigate("/"); // If userId exists, navigate to home page
      }
    }, []);

  return (
    <>
      <div className="bg-cover h-screen" style={{backgroundImage: `url(${deskbg})`}}>
      <div className=" flex justify-center items-center py-8">
        <img className="w-[130px] md:w-[200px]" src={logo} alt="" />
      </div>
        <div className='w-full md:mt-[50px] '>
          <div className='flex flex-col md:flex-row justify-center items-center w-full'>
            {/* Link to the quiz route */}
            <Link to="/uploadvideo">
              <img  className='w-[130px] md:w-[180px] mb-4 md:mb-0 md:mr-8' src={`${upload}`} alt="" />
            </Link>
            <Link to="/uploadimage">
              <img  className='w-[130px] md:w-[180px] mb-4 md:mb-0 md:mr-8' src={`${imageorvideo}`} alt="" />
            </Link>
            <Link to="/uploadfile">
              <img  className='w-[130px] md:w-[180px] mb-4 md:mb-0 md:mr-8' src={`${imageupload}`} alt="" />
            </Link>
            <Link to="/quizinst">
              <img className='w-[130px] md:w-[180px] mb-4 md:mb-0 ' src={`${quizimg}`} alt="" />
            </Link>
            <Link to="/snapinst">
              <img className='w-[130px] md:w-[180px] mb-4 md:mb-0 md:mr-8 md:ml-8' src={`${snapthebag}`} alt="" />
            </Link>          
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .bg-cover {
            background-image: url(${mobbg});
          }
          .w-[220px] {
            width: 150px; /* Reduce the width for mobile view */
          }
        }
      `}</style>
    </>
  );
}

export default Home;
