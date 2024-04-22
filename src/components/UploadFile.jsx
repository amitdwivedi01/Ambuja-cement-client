import React, { useState } from "react";
import bgImage from "../assets/loginpage.png"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadFile = ({ host }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
    const maxSizeImage = 5 * 1024 * 1024; // 5MB
    const maxSizeVideo = 25 * 1024 * 1024; // 25MB

    if (file && allowedTypes.includes(file.type)) {
      if (file.type.startsWith("image/") && file.size <= maxSizeImage) {
        setFile(file);
      } else if (file.type === "video/mp4" && file.size <= maxSizeVideo) {
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
      <h1 className="text-[#fee590] text-3xl md:text-5xl my-2">नियम और शर्तें लागू</h1>
      <div className="md:h-[56%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[95%] md:w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-[11px]">
            बनेगा तो बढ़ेगा इंडिया. <br />
            अब आप से ही बढ़ेगा इंडिया। <br /> <br />
            प्रतियोगिता के नियम <br />
            आपके शहर के निर्माण में आपके अल्ट्राटेक डीलरशिप का क्या महत्व है? <br />
            अपने और अपने परिवार के साथ अपने अल्ट्राटेक रिटेल आउटलेट की एक अच्छी तस्वीर खींच के हमें भेजें और हमें दिखाएं अपनी खुशियों की दुकान,
            जिसके द्वार आप कर रहे हों अपने देश के निर्माण में महेतवपूर्ण योगदान <br /> <br />
            नियम और शर्ते लागू <br />
            1. अपनी कहानी तस्वीर / वीडियो <br />
2. तस्वीर / वीडियो अच्छे उजाले में खिंची होनी चाहिए और चेहरे साफ दिखने चाहिए <br />
3. तैय्यार होकर तसवीर / वीडियो खींचें <br />
4. तस्वीर केवल जेपीईजी फॉर्मेट में होनी चाहिए <br />
5. वीडियो केवल MP4 फॉर्मेट में होनी चाहिए <br />
7. आपकी तस्वीर का साइज़ 2 MB से बड़ा नहीं होना चाहिए, वरना जमा नहीं होगी <br />
8. आपकी वीडियो का साइज़ 20 MB से बड़ा नहीं होना चाहिए, वरना जमा नहीं होगी <br />
9. ये कहानी तस्वीर और वीडियो केवल अल्ट्राटेक प्रतियोगिता के लिए ही दी जानी चाहिए,  इस कहानी तस्वीर और वीडियो का उपयोग किसी और जगह नहीं किया जाना चाहिए <br />
10. इस कहानी तस्वीर / वीडियो को जमा करके, इस प्रतियोगिता के माध्यम से आप इन सब पर अपना सम्पूर्ण अधिकार अल्ट्राटेक को दे रहे हैं <br />
11. अल्ट्राटेक के पास आपकी पूर्व सूचना के बिना किसी भी उद्देश्य के लिए इस कहानी तस्वीर / वीडियो का उपयोग करने का पूर्ण अधिकार है <br />
13. यह प्रतियोगिता 30 अप्रैल को  बजे समाप्त हो जायेगी <br />
14.  12 बज के  तक प्राप्त की गई कहानियां और वीडियो को ही अंतिम चयन और अंतिम निर्णय के लिए स्वीकार किया जाएगा <br />
15. 3 सबसे ज़ियादा प्रेरणात्मक कहानियों का प्रदर्शन इवेंट मैं किया जाएगा <br />

          </h1>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-4 py-6"
      >
        <input
          type="file"
          accept="image/*,video/mp4"
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
            <img src={submitButton} alt="Submit" className="w-100 h-auto" />
          </button>
        )}
      </form>
    </div>
  );
};

export default UploadFile;
