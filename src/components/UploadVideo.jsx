import React, { useState } from "react";
import bgImage from "../assets/loginpage.png"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import axios from "axios";
import { useNavigate } from "react-router-dom";
import instruction from '../assets/VideoInstruction.png'
const userId = localStorage.getItem("userId");

const UploadVideo = ({host}) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false)
  const Navigate = useNavigate()

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
        Navigate("/home")
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
        <h1 className="text-[#fee590] text-[50px]">INSTRUCTION</h1>
      <div className="md:h-[55%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-sm">बनेगा तो बढ़ेगा इंडिया. <br />
अब आप से ही बढ़ेगा इंडिया। <br /> <br />

प्रतियोगिता के नियम <br /> 
आपके शहर के निर्माण में आपके अल्ट्राटेक डीलरशिप का क्या महत्व है? <br />
अपने और अपने परिवार के साथ अपने अल्ट्राटेक रिटेल आउटलेट की एक अच्छी तस्वीर खींच के हमें भेजें और हमें दिखाएं अपनी खुशियों की दुकान, 
जिसके द्वार आप कर रहे हों अपने देश के निर्माण में महेतवपूर्ण योगदान <br /> <br />

नियम और शर्ते लागू <br />
1. अपनी तसवीर दिए गए लिंक __ प्रति अपलोड करें। <br />
2. तस्वीर अच्छे उजाले में खिंची हो और चेहरे साफ दिखने चाहिए <br />
3. तैय्यर होकर तसवीर खिंचें <br />
4. तस्वीर केवल लैंडस्केप फॉर्मेट में होनी चाहिए <br />
5. आपकी तस्वीर का साइज़ 2 एमबी से बड़ा नहीं होना चाहिए, वरना जमा नहीं होगी <br />
6. ये तस्वीर केवल अल्ट्राटेक प्रतियोगिता के लिए ही दी जानी चाहिए, क्या तस्वीर का उपयोग किसी और जगह नहीं किया जाना चाहिए <br />
7. क्या तस्वीर को जमा करके, इस प्रतियोगिता के माध्यम से आप इस चित्र का अपना सम्पूर्ण अधिकार अल्ट्राटेक को दे रहे हैं <br />
8. अल्ट्राटेक के पास आपकी पूर्व सूचना के बिना किसी भी उद्देश्य के लिए यह छवि/तस्वीर का उपयोग करने का पूर्ण अधिकार है</h1>
</div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 rounded-md w-[400px]">
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
        <svg
          className="animate-spin h-6 w-6 mr-3 text-white"
          viewBox="0 0 24 24"
        >
         
        </svg>
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