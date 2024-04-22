import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import deskbg from '../assets/desktopbg.jpg';
import mobbg from '../assets/mobilebg.jpg';
import quizimg from '../assets/button1.png';
import upload from '../assets/button5.png';
import snapthebag from '../assets/button2.png'
import imageupload from '../assets/button3.png'
import imageorvideo from '../assets/button4.png';

const Home = () => {
  return (
    <>
      <div className="bg-cover h-screen" style={{backgroundImage: `url(${deskbg})`}}>
        <div className='flex w-full justify-center align-item-center'>
          <div className='flex flex-col md:flex-row justify-center items-center h-screen w-full'>
            {/* Link to the quiz route */}
            <Link to="/quizinst">
              <img className='w-[220px] mb-4 md:mb-0 ' src={`${quizimg}`} alt="" />
            </Link>
            <Link to="/snapinst">
              <img className='w-[220px] mb-4 md:mb-0 md:mr-8 md:ml-8' src={`${snapthebag}`} alt="" />
            </Link>
            
            <Link to="/uploadfile">
              <img  className='w-[220px] mb-4 md:mb-0 md:mr-8' src={`${imageupload}`} alt="" />
            </Link>
            <Link to="/uploadimage">
              <img  className='w-[220px] mb-4 md:mb-0 ' src={`${imageorvideo}`} alt="" />
            </Link>
            <Link to="/uploadvideo">
              <img  className='w-[220px] mb-4 md:mb-0 md:ml-8' src={`${upload}`} alt="" />
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
