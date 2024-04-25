import React,{useEffect} from 'react'
import bgImage from "../assets/Websitebg.jpg";
import { useNavigate } from "react-router-dom";


const Quizinstr = () => {
  const Navigate = useNavigate();  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const isquiz = localStorage.getItem('quiz');
    if (!userId) {
      Navigate("/"); // If userId exists, navigate to home page
    }

    if(isquiz){
      Navigate('/home')
    }
  }, []);
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-cover `}
      style={{ backgroundImage: `url(${bgImage})`}}
    >
      <h1 className="text-[#fee590] text-2xl">बैंकॉक सामान्य ज्ञान प्रतियोगिता</h1> <br />
      <div className="md:h-[55%] w-full bg-black opacity-[0.58] flex justify-center items-center">
        <div className="flex justify-center items-center w-[95%] md:w-[80%]">
        <h1 className="text-[#fee590] my-4 mx-[10px] text-sm">
        सबसे कम समय में सभी प्रश्नों के सही उत्तर देकर यह प्रतियोगिता जीतने का खास मौका! <br />

• अपनी स्क्रीन पर दिखाए गए प्रश्नों और उसके नीचे दिए गए चार विकल्प में से सही उत्तर चुनिये <br />
• और अपने चुने गए विकल्प पर टैप कीजिये <br /> <br />

नियम और शर्ते लागू : <br /> <br />

1)	इस खेल में कुल मिलाकर 8 प्रश्न पूछे जाएंगे <br />
2)	आपके एक बार चुने गए उत्तर को अंतिम माना जाएगा <br />
3)	आप वापस नहीं जा सकते और उत्तर नहीं बदल सकते <br />
4)	सबसे कम समय में सभी प्रश्नों के सही उत्तर देने वाले टॉप 3 विजेताओं को अल्ट्राटेक की तरफ से पुरस्कार दिया जाएगा <br />
5)	इस प्रतियोगिता की अवधि केवल 1 मिनट है <br />
6)	यह प्रतियोगिता 30 अप्रैल 2024 रात 12 बजे तक ही जारी रहेगी <br />

धन्यवाद. अल्ट्राटेक से जुड़े रहने और इस खेल को अंत तक खेलने के लिए हम आपके आभारी हैं। हम आशा करते हैं कि बैंकॉक से जुड़ी महतवपूर्ण तथ्यों की जानकारी आपके लिए लाभकारी रहेगी। आपका बैंकॉक का सफ़र शुभ हो। जल्द मिलते हैं बैंकॉक में.

</h1>
</div>
      </div>
        <button className='bg-[#fee590] font-semibold text-xl text-[#311514] rounded-md px-6 py-2 mt-8' onClick={()=>{Navigate('/start')}}>Start</button>
    </div>
  )
}

export default Quizinstr;