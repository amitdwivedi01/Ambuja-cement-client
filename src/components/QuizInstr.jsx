import React from 'react'
import bgImage from "../assets/loginpage.png";
import { useNavigate } from "react-router-dom";


const Quizinstr = () => {
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
1. इस खेल में कुल मिलाकर 5 प्रश्न पूछे जाएंगे <br />
2. कुल मिलाकर हर प्रश्न के आपको चार विकल्प दिए जाएंगे, जिसमें से तीन गलत उत्तर होंगे, लेकिन आपको केवल एक सही उत्तर चुनना है <br />
3. और अपने चुने गए विकल्प पर टैप करना है <br />
4. आपके एक बार चुने गए उत्तर को अंतिम माना जाएगा। आप वापस नहीं जा सकते और उत्तर नहीं बदल सकते। <br />
5. सबसे कम समय में सभी प्रश्नों के सही उत्तर देने वाले टॉप 3 विजेताओं को अल्ट्राटेक की तरफ से पुरस्कार दिया जाएगा <br />
6. विजेताओं के परिणम की घोषणा करने का अधिकार और पूर्ण और अंतिम निर्णय केवल अल्ट्राटेक का ही रहेगा <br />
7. इस प्रतियोगिता की अवधि केवल 90 सेकंड है <br />
8. यह प्रतियोगिता 23 मई को शाम के 12.00 बजे समाप्त हो जायेगी <br />
</h1>
</div>
      </div>
        <button className='bg-[#fee590] font-semibold text-xl text-[#311514] rounded-md px-6 py-2 mt-8' onClick={()=>{Navigate('/start')}}>Start</button>
    </div>
  )
}

export default Quizinstr;