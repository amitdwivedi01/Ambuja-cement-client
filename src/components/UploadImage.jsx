import React, { useState } from "react";
import bgImage from "../assets/loginpage.png"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UploadImage = ({host}) => {
  const [image, setImage] = useState(null);
  const [loading,setLoading]= useState(false)
  const Navigate = useNavigate();
  

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
      <h1 className="text-[#fee590] text-[50px]">नियम और शर्तें लागू</h1>
      <div className="md:h-[55%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[95%] md:w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-[12px]">बनेगा तो बढ़ेगा इंडिया. <br />
अब आप से ही बढ़ेगा इंडिया। <br /> <br />

प्रतियोगिता के नियम <br /> 
आपके शहर के निर्माण में आपके अल्ट्राटेक डीलरशिप का क्या महत्व है? <br />
अपने और अपने परिवार के साथ अपने अल्ट्राटेक रिटेल आउटलेट की एक अच्छी तस्वीर खींच के हमें भेजें और हमें दिखाएं अपनी खुशियों की दुकान, 
जिसके द्वार आप कर रहे हों अपने देश के निर्माण में महेतवपूर्ण योगदान <br /> <br />

1. अपनी नंबर 1 फैमिली  फोटो / तसवीर <br />
2. तस्वीर / फोटो  अच्छे उजाले में खिंची होनी चाहिए और चेहरे साफ दिखने चाहिए <br />
3. तैय्यार होकर फोटो / तसवीर खींचें <br />
4. तस्वीर / फोटो केवल जेपीईजी फॉर्मेट और लैंडस्केप मोड में होनी चाहिए <br />
5. आपकी फोटो / तस्वीर का साइज़ 2 एमबी से बड़ा नहीं होना चाहिए, वरना जमा नहीं हो पायेगी <br />
6. ये तस्वीर / फोटो केवल अल्ट्राटेक प्रतियोगिता के लिए ही दी जानी चाहिए,  इस तस्वीर का उपयोग किसी और जगह नहीं किया जाना चाहिए <br />
7. इस तस्वीर / फोटो को जमा करके, इस प्रतियोगिता के माध्यम से आप इस फोटो का अपना सम्पूर्ण अधिकार अल्ट्राटेक को दे रहे हैं  <br />
8. अल्ट्राटेक के पास आपकी पूर्व सूचना के बिना किसी भी उद्देश्य के लिए यह छवि /तस्वीर/ फोटो का उपयोग करने का पूर्ण अधिकार है <br />
10. यह प्रतियोगिता 30 अप्रैल को शाम के 12.00 बजे समाप्त हो जायेगी <br />
12. 3 सबसे ज़ियादा क्रिएटिव फोटो / तस्वीरों का प्रदर्शन इवेंट मैं किया जाएगा <br />
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
