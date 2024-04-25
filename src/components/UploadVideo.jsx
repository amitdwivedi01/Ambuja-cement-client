import React, { useState, useEffect } from "react";
import bgImage from "../assets/Websitebg.jpg"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import axios from "axios";
import { useNavigate } from "react-router-dom";
import instruction from '../assets/VideoInstruction.png'


const UploadVideo = ({host}) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false)
  const Navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        Navigate("/"); // If userId exists, navigate to home page
      }
    }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    // Check if file is a video and size is less than 25MB
    if (file && file.type.startsWith("video/") && file.size <= 25 * 1024 * 1024) {
      setVideo(file);
    } else {
      alert("Please upload a video file (max size 25MB)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      alert("Please upload a video file");
      return;
    }
    try {
      setLoading(true)
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("video", video);
      // Send video data to the backend using Axios
      const response = await axios.post(`${host}/api/users/videos/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.status === 200){
        setLoading(false)
        Navigate("/thank")
      }else{
        alert("Some error occur in uploding, Please try again in some time")
        setLoading(false)
      }
    } catch (error) {
      alert("Some error occur in uploding, Please try again in some time")
      setLoading(false)
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-cover `}
      style={{ backgroundImage: `url(${bgImage})`}}
    >
        <h1 className="text-[#fee590] text-2xl">दिखाइये अपना लय भारी जलवा</h1> <br />
      <div className="md:h-[55%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-[11px]">

        अपना कोई भी प्रिय और पसंदीदा फिल्मी / बॉलीवुड डायलॉग किसी भी फिल्म से चुनिए और उसमें अपना लय भारी का भाव और लय भारी का डायलॉग जोड़कर अपने स्टाइल में बोलकर रिकॉर्ड कीजिए और अपना वीडियो हमसे शेयर कीजिए। अल्ट्राटेक के टॉप जजों द्वारा चुने गए 3 सबसे ज़्यादा बेहतरीन, मज़ेदार, और क्रिएटिव डायलॉग वीडियो को ही
इवेंट में  प्रदर्शित वा पुरुसकृत किया जाएगा। <br /> <br />
नियम और शर्ते लागू <br /> <br />

1. अपने डायलॉग वाली वीडियो को इस स्क्रीन के नीचे दिए गए बटन  पर अपलोड करें <br />
2. वीडियो अच्छे उजाले में खिंची होनी चाहिए व चेहरा साफ दिखना चाहिए <br />
3. अच्छे से तैय्यार होकर वीडियो बनाएं <br />
4. वीडियो केवल MP4 फॉर्मेट में ही होनी चाहिए <br />
5. वीडियो में आपकी आवाज़ पूरी साफ सुनाई देनी चाहिए <br />
6. आप फिल्म के किरदार में आकर अपना डायलॉग बोल सकते हैं या अपने खुद के स्टाइल में भी बोल सकते हैं <br />
7. परंतु खास ध्यान रहे - अपनी फिल्म के डायलॉग में लाई भारी शब्द जोडना ना भूलें, अन्यथा आपकी वीडियो अगले चयन के लिए मान्य नहीं होगी <br />
8. आपके वीडियो का साइज़ 20 एमबी  से बड़ा नहीं होना चाहिए, वरना जमा नहीं हो पायेगी <br />
9. यह प्रतियोगिता केवल  26 अप्रैल 2024 से 30 अप्रैल 2024 रात 12 बजे तक ही जारी रहेगी <br />

 </h1>
</div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 rounded-md w-[400px] flex flex-col justify-center items-center">
        {/* <label htmlFor="videoUpload" className="text-4xl text-[#fee590] mb-4 pb-4 text-center">Upload Your Video</label> */}
        <input
          type="file"
          id="videoUpload"
          accept="video/*"
          onChange={handleVideoChange}
          className="w-full mt-4 mb-4 p-2 rounded-xl border-4 border-[#D2A561] bg-black bg-opacity-50 text-[#fee590] placeholder-[#887842] text-center"
          style={{ outline: 'none' }} // Remove outline when clicked
        />
        {loading? 
        ( // Show loading spinner if loading state is true
        <button type="button" className="bg-[#D2A561] text-black px-5 py-2 rounded-md text-xl font-semibold" disabled>
        Processing...
      </button>
      ) : (   
        <button
          type="submit"
          className="bg-transparent border-none cursor-pointer"
        >
          <img src={submitButton} alt="Submit" className="w-100 h-auto" />
        </button>
      )
      }
      </form>
    </div>
  );
};

export default UploadVideo;
