import React, { useState,useEffect } from "react";
import bgImage from "../assets/Websitebg.jpg"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadFile = ({ host }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        Navigate("/"); // If userId exists, navigate to home page
      }
    }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
    const maxSizeImage = 5 * 1024 * 1024; // 5MB
    const maxSizeVideo = 25 * 1024 * 1024; // 25MB

    if (file && allowedTypes.includes(file.type)) {
      if (file.type === "video/mp4" && file.size <= maxSizeVideo) {
        setFile(file);
      } else {
        alert("Please upload a file within the allowed size limit");
      }
    } else {
      alert("Please upload a valid image (JPEG/PNG/GIF) or video (MP4) file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file");
      return;
    }
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("file", file);
      // Send file data to the backend using Axios
      const response = await axios.post(`${host}/api/users/upload/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setLoading(false);
        Navigate("/thank")
        // alert("File uploaded successfully");
      } else {
        alert("Error occurred while uploading file");
        setLoading(false);
      }
    } catch (error) {
      alert("Error occurred while uploading file");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-[#fee590] text-3xl md:text-3xl my-2">बनेगा तो बढ़ेगा इंडिया.</h1>
      <div className="md:h-[56%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[95%] md:w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-[10px]">
अब आप से ही आगे बढ़ेगा इंडिया। <br />

आपके शहर या क्षेत्र के निर्माण और प्रगति में आपका व्यक्तिगत या आपकी अल्ट्राटेक डीलरशिप व्यवसाय का क्या महतवपूर्ण योगदान है? आप या आपका परिवार अपने शहर और क्षेत्र के विकास में क्या भूमिका निभा रहे हैं? और कैसे? अल्ट्राटेक के साथ अपनी गौरवपूर्ण कहानी सुनाने के लिए नीचे दिए गए बटन  पर  अपनी वीडियो अपलोड करें । अल्ट्राटेक न्यायाधीशों द्वारा चुनी गई की गई केवल 3 सर्वश्रेष्ठ कहानियों को इवेंट में प्रदर्शित किया जाएगा और विधिवत पुरस्कार दिया जाएगा। <br /> <br />

नियम और शर्ते लागू <br /> <br />

1. कृपया अपना 2 से 2.5 मिनट की अवधि का वीडियो रिकॉर्ड करें और अपनी कहानी सुनाएं <br />
2. अपनी वीडियो अपनी स्क्रीन के नीचे दिए गए बटन  पर अपलोड करें  <br />
3. वीडियो अच्छे उजाले में खिंची होनी चाहिए और चेहरे साफ दिखने चाहिए <br />
4. तैय्यार होकर वीडियो खींचें <br />
5. वीडियो केवल MP4 फॉर्मेट में होनी चाहिए <br />
6. आपकी वीडियो का साइज़ 20 एमबी से बड़ा नहीं होना चाहिए, वरना जमा नहीं होगी <br />
7. यह प्रतियोगिता केवल  26 अप्रैल 2024 से 30 अप्रैल 2024 रात 12 बजे तक ही जारी रहेगी <br />


          </h1>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-4 py-6"
      >
        <input
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          className="w-full mt-4 mb-4 p-2 rounded-xl border-4 border-[#D2A561] bg-black bg-opacity-50 text-[#fee590] placeholder-[#887842] text-center"
          style={{ outline: "none" }}
        />
        {loading ? (
          <button type="button" className="bg-[#D2A561] text-black px-5 py-2 rounded-md text-xl font-semibold" disabled>
            Processing...
          </button>
        ) : (
          <button type="submit" className="bg-transparent border-none cursor-pointer">
            <img src={submitButton} alt="Submit" className="w-80 h-auto" />
          </button>
        )}
      </form>
    </div>
  );
};

export default UploadFile;
