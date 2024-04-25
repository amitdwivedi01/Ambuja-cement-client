import React,{useEffect} from 'react'
import bgImage from "../assets/Websitebg.jpg";
import { useNavigate } from "react-router-dom";


const SnapInstr = () => {
  const Navigate = useNavigate();
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const issack = localStorage.getItem('sack');
    if (!userId) {
      Navigate("/"); // If userId exists, navigate to home page
    }
    if(issack){
      Navigate('/home')
    }
  }, []);
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-cover `}
      style={{ backgroundImage: `url(${bgImage})`}}
    >
      <h1 className="text-[#fee590] text-2xl text-center">जकड़ के पकड़</h1><br />
      <div className="md:h-[55%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[95%] md:w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-sm">
        15 सेकंड में अधिक से अधिक अल्ट्राटेक सुपर बैगज़ को फ्रेम में डालो और जीतो मज़ेदार इनाम। <br /> <br />
        नियम और शर्ते लागू <br /> <br />


1.	यह खेल आपकी सजगता और रफ़्तार का परीक्षण करने के लिए है <br />

2.	15 सेकंड तक अल्ट्राटेक सुपर बैगज़ निरंतर आपकी स्क्रीन पर चलते रहेंगे <br />

3.	आपको बैगज़ को जल्दी से जल्दी टैप कर के पकड़ना होगा और उन्हें अपनी स्क्रीन पर दिखाए गए फ्रेम में जल्दी से भर के रोकना होगा <br />

4.	सबसे कम समय में जो व्यक्ति अधिकतम बैगज़ फ्रेम में भरेगा वह इस खेल का विजेता होगा वाले टॉप 3 विजेताओं को अल्ट्राटेक की तरफ से पुरस्कार दिया जाएगा  <br />

5.	परिणामों के मूल्यांकन के लिए आपके पहले प्रयास को आपके अंतिम प्रयास के रूप में गिना जाएगा  <br />
6.	यह प्रतियोगिता 30 अप्रैल 2024 रात 12 बजे तक ही जारी रहेगी <br />


</h1>
</div>
      </div>
        <button className='bg-[#fee590] font-semibold text-xl text-[#311514] rounded-md px-6 py-2 mt-8' onClick={()=>{Navigate('/startsnap')}}>Start</button>
    </div>
  )
}

export default SnapInstr;