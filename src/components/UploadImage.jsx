import React, { useState,useEffect } from "react";
import bgImage from "../assets/Websitebg.jpg"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UploadImage = ({host}) => {
  const [image, setImage] = useState(null);
  const [loading,setLoading]= useState(false)
  const Navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        Navigate("/"); // If userId exists, navigate to home page
      }
    }, []);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Check if file is an image and size is less than 5MB
    if (file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
      setImage(file);
    } else {
      alert("Please upload an image file (max size 5MB)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image file");
      return;
    }
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("image", image);
      const userId = localStorage.getItem("userId");
      // Send image data to the backend using Axios
      console.log(userId,"userID");
      const response = await axios.post(`${host}/api/users/images/${userId}`, formData, {
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
      <h1 className="text-[#fee590] text-2xl">नंबर 1 अल्ट्राटेक का नंबर 1 परिवार </h1> <br />
      <div className="md:h-[55%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[95%] md:w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-[11px]">
        अपने नंबर 1 परिवार के साथ बिताए गए अपने नंबर 1 पल की अपनी बेस्ट पारिवारिक तस्वीर अपलोड करें। इस तस्वीर के माध्यम से आपकी क्रिएटिविटी सामने आनी चाहिए. इवेंट में 3 सर्वश्रेष्ठ और सबसे रचनात्मक रूप से क्लिक की गई तस्वीरें प्रदर्शित की जाएंगी. <br />

आइए देखें आप और आपका अपने नंबर 1 परिवार कितनेनंबर 1 क्रिएटिव हैं। <br /> <br />


नियम और शर्ते लागू <br /> <br />

1)	अपनी नंबर 1 फैमिली  तसवीर को अपनी स्क्रीन के नीचे दिए गए बटन  पर अपलोड करें <br />
2)	तस्वीर अच्छे उजाले में खिंची होनी चाहिए और चेहरे साफ दिखने चाहिए <br />
3)	तैय्यार होकर तसवीर खींचें <br />
4)	तस्वीर केवल जेपीईजी फॉर्मेट में ही होनी चाहिए <br />
5)	आपकी तस्वीर का साइज़ 2 एमबी से बड़ा नहीं होना चाहिए, वरना जमा नहीं हो पायेगी <br />
6)	यह प्रतियोगिता केवल  26 अप्रैल 2024 से 30 अप्रैल 2024 रात 12 बजे तक ही जारी रहेगी <br />
 <br />
</h1>
</div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 rounded-md w-[400px] flex flex-col justify-center items-center">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
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

export default UploadImage;
