import React, { useState } from "react";
import bgImage from "../assets/loginpage.png"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import axios from "axios";
import { useNavigate } from "react-router-dom";
import instruction from '../assets/VideoInstruction.png'


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
        <h1 className="text-[#fee590] text-[50px]">नियम और शर्तें लागू</h1>
      <div className="md:h-[55%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-[12px]">दिखाइये अपना लई भारी जलवा <br />

आप अल्ट्राटेक परिवार के एक विशेष सदस्य हैं। आपका साहस और आपका पूर्ण सहयोग अत्यंत सराहनीय वा प्रशंसनीय है। आपका हर संकल्प, आपका हर कदम लई भारी है। <br /> <br />
1. वीडियो अच्छे उजाले में खिंची होनी चाहिए व चेहरा साफ दिखना चाहिए <br />
2. अच्छे से तैय्यार होकर वीडियो बनाएं <br />
3. वीडियो केवल MP4 फॉर्मेट में ही होनी चाहिए <br />
4. वीडियो में आपकी आवाज़ पूरी साफ सुनाई देनी चाहिए <br />
5. आप फिल्म के किरदार में आकर अपना डायलॉग बोल सकते हैं या अपने खुद के स्टाइल में भी बोल सकते हैं <br />
6. परंतु खास ध्यान रहे - अपनी फिल्म के डायलॉग में लाई भारी शब्द जोडना ना भूलें, अन्यथा आपकी वीडियो अगले चयन के लिए मान्य नहीं होगी <br />
7. आपके वीडियो का साइज़ 20 MB से बड़ा नहीं होना चाहिए, वरना जमा नहीं हो पायेगी <br />
8. ये वीडियो केवल अल्ट्राटेक प्रतियोगिता के लिए ही दी जानी चाहिए, इस वीडियो का उपयोग किसी भी तरह और किसी भी जगह नहीं किया जाना चाहिए <br />
9. इस वीडियो को जमा करके, इस प्रतियोगिता के माध्यम से आप इस वीडियो का अपना सम्पूर्ण अधिकार अल्ट्राटेक को दे रहे हैं <br />
10. अल्ट्राटेक के पास आपकी पूर्व सूचना के बिना किसी भी उद्देश्य के लिए इस वीडियो का उपयोग करने का पूर्ण अधिकार है <br />
11. यह प्रतियोगिता 30 अप्रैल को रात 12 बजे समाप्त हो जायेगी <br />
12. 3 सबसे ज़ियादा क्रिएटिव डायलॉग वीडियो का प्रदर्शन इवेंट मैं किया जाएगा </h1>
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
