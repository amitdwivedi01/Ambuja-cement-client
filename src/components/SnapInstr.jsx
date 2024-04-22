import React from 'react'
import bgImage from "../assets/loginpage.png";
import { useNavigate } from "react-router-dom";


const SnapInstr = () => {
    const Navigate = useNavigate()
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-cover `}
      style={{ backgroundImage: `url(${bgImage})`}}
    >
      <h1 className="text-[#fee590] text-[50px]">नियम और शर्तें लागू</h1>
      <div className="md:h-[55%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[95%] md:w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-lg">
1. इस खेल में 30 सेकंड के अंदर आपको अधिकतम बैगज़ मार्कर / फ्रेम में डालने हैं <br />
2 इस खेल को जीतने के लिए आपको सबसे कम समय में बिना रुके अधिकतम बैगज़ पकड़ने होंगे <br />
3. अगर आप सबसे अधिक बैगज़ मार्कर / फ्रेम में डाल कर रोक लेते हैं तो आप विजेता पुरस्कार के पात्र हैं <br />
4. सबसे कम समय सबसे अधिक बैगज़ डालने वाले टॉप 3 विजेताओं को अल्ट्राटेक की तरफ से पुरस्कार दिया जाएगा  <br />
5. विजेताओं के परिणमन की घोषणा करने का अधिकार व पूर्ण और अंतिम निर्णय केवल अल्ट्राटेक का ही रहेगा <br />
6. इस प्रतियोगिता की अवधि केवल 30 सेकंड है <br />
7. यह प्रतियोगिता 24  मई को 12  बजे समाप्त हो जायेगी <br />
8. 12 बज के तक प्राप्त किये गए उत्तरो और परिणाम को ही को ही अंतिम चयन और अंतिम निर्णय के लिए स्वीकार किया जाएगा <br />
</h1>
</div>
      </div>
        <button className='bg-[#fee590] font-semibold text-xl text-[#311514] rounded-md px-6 py-2 mt-8' onClick={()=>{Navigate('/startsnap')}}>Start</button>
    </div>
  )
}

export default SnapInstr;