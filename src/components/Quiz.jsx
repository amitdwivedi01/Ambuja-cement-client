import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import deskbg from "../assets/desktopbg.jpg";

const Quiz = ({ host }) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "बैंकॉक में स्थित शुद्ध सोने से बनी, 5.5 टन वजन वाली, और 250 मिलियन डॉलर मूल्य की, प्लास्टर और रंगीन कांच की परत से ढकी और छिपी हुई विश्व की सबसे बड़ी बुद्ध प्रतिमा, जिसे अक्सर ‘स्वर्ण बुद्धा’ के नाम से जाना जाता है, उसकी असली पहचान कितने वर्षों के बाद सामने आई और किस वर्ष में हुई?",
      options: [
        { text: "a)	200 साल बाद, वर्ष 1955 में", isCorrect: true },
        { text: "b)	250 साल बाद, वर्ष 1945 में", isCorrect: false },
        { text: "c)	220 साल बाद, वर्ष 1955 में", isCorrect: false },
        { text: "d)	200 साल बाद, वर्ष 1965 में", isCorrect: false },
      ],
    },
    {
      question: 'बैंकॉक की 372 किमी लंबी जीवन रेखा, "द रिवर ऑफ किंग्स", जिसे अक्सर "चाओ फ्राया रिवर या नदी" के नाम से भी जाना जाता है, उसका नाम किस राजा द्वारा रखा गया था?',
      options: [
        { text: "a)	राजा राम प्रथम", isCorrect: true },
        { text: "b)	राजा राम द्वितीय", isCorrect: false },
        { text: "c)	राजा राम तृतीया", isCorrect: false },
        { text: "d)	राजा राम चतुर्थ", isCorrect: false },
      ],
    },
    {
      question: "‘सफ़ारी वर्ल्ड’ के किस भाग में एक बड़ी झील है जहाँ पर्यटक सुंदर नाव की सवारी का आनंद लेते हुए और तटों के किनारे विभिन्न जानवरों को देखते हुए अफ्रीकी और एशियाई सफ़ारी के रोमांच और उत्साह का अनुभव कर सकते हैं? ",
      options: [
        { text: "a)	अफ़्रीकी पार्क", isCorrect: false },
        { text: "b)	समुद्री पार्क", isCorrect: false },
        { text: "c)	जंगल क्रूज", isCorrect: true },
        { text: "d)	वाटर लेक सफारी", isCorrect: false },
      ],
    },
    {
      question: "बैंकॉक को दुनिया के सबसे लंबे शहर के नाम के रूप में गिनीज बुक ऑफ वर्ल्ड रिकॉर्ड्स में सूचीबद्ध किया गया है। यह नाम कितने अक्षर का है?",
      options: [
        { text: "a)	158 अक्षर", isCorrect: false },
        { text: "b)	178 अक्षर", isCorrect: false },
        { text: "c)	168 अक्षर", isCorrect: true },
        { text: "d)	188 अक्षर", isCorrect: false },
      ],
    }
    ,
    {
      question: "बैंकॉक के सबसे बड़े थोक कपड़ा बाज़ार का क्या नाम है?",
      options: [
        { text: "a)	वांग लैंग मार्केट", isCorrect: false },
        { text: "b)	चाटुचक बाजार", isCorrect: false },
        { text: "c)	प्रतानुम मार्केट", isCorrect: true },
        { text: "d)	चाइनाटाउन मार्केट", isCorrect: false },
      ],
    }
    ,
    {
      question: "बैंकॉक के ‘सफारी वर्ल्ड’ में हर रोज़ होने वाला सबसे प्रसिद्ध ‘ओरंगुटान शो’ क्या कहलाता है?",
      options: [
        { text: "a)	ओरंगुटान बॉक्सिंग शो", isCorrect: true },
        { text: "b)	ओरंगुटान साइक्लिंग शो", isCorrect: false },
        { text: "c)	ओरंगुटान एक्टिंग शो", isCorrect: false },
        { text: "d)	ओरंगुटान और हाथी कुश्ती शो", isCorrect: false },
      ],
    },
  ]);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [showGameOverModal, setShowGameOverModal] = useState(false); // State for game over modal visibility
  const [showCorrectModal, setShowCorrectModal] = useState(false); // State for displaying correct answer modal
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
  const [selectedCorrectOption, setSelectedCorrectOption] = useState(null); // State to track correct option when incorrect answer is selected
  const [userComment, setUserComment] = useState(""); // State to store user's comment

  const timeLeftRef = useRef(timeLeft); // Ref to hold the latest timeLeft value
  const timer = useRef(null); // Ref to hold the timer interval

  useEffect(() => {
    timer.current = setInterval(() => {
      if (timeLeftRef.current > 0) {
        setTimeLeft((prevTimeLeft) => {
          timeLeftRef.current = prevTimeLeft - 1; // Update ref with the latest timeLeft value
          return prevTimeLeft - 1; // Update state
        });
      } else {
        clearInterval(timer.current);
        setShowGameOverModal(true); // Show game over modal when time is up
      }
    }, 1000);

    return () => clearInterval(timer.current);
  },[]); // Added showCorrectModal to the dependency array to pause timer when incorrect modal pops up

  const handleAnswer = (isCorrect, optionText) => {
    setSelectedOption(optionText);

    if (isCorrect) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
        } else {
          clearInterval(timer.current); // Show game over modal when all questions are answered
          setShowGameOverModal(true);
        }
      }, 2000); // Move to next question after 2 seconds
    } else {
      setSelectedCorrectOption(
        questions[currentQuestion].options.find((option) => option.isCorrect)
          .text
      );
      setShowCorrectModal(true); // Show correct answer modal when answer is incorrect
      clearInterval(timer.current);
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      // Submit user data to the backend
      const userData = {
        score,
        timeTaken: 60 - timeLeftRef.current, // Calculate time taken in seconds
        userComment: userComment, // Include user's comment
      };

      const response = await axios.put(
        `${host}/api/users/quizscore/${userId}`,
        userData
      );
      if (response.status === 200) {
        navigate("/thank");
      } else {
        alert("Error Uploading score, Please Try again!");
      }
    } catch (error) {
      alert("Error Uploading score, Please Try again!");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen relative"
      style={{ backgroundImage: `url(${deskbg})` }}
    >
      <div className="absolute top-0 right-0 m-4 text-lg text-[#fee590] bg-[#311514] px-4 py-2 rounded-xl">
        {timeLeft} | Score: {score}
      </div>
      <h1 className="text-[60px] font-bold mb-8 text-center text-[#fee590]">
      बैंकॉक सामान्य ज्ञान प्रतियोगिता
      </h1>
      {showGameOverModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-[#2F1312] p-8 rounded-lg text-center text-[#fee590] shadow-xl modal-container">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="mb-4">
              Time taken: {Math.floor((60 - timeLeftRef.current) / 60)} minutes{" "}
              {timeLeftRef.current % 60} seconds
            </p>
            <p>Score: {score}</p>
            <h1>Please provide us the feedback!</h1>
            <div>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Enter your comment here..."
                className="mt-4 px-4 py-2 w-full border border-gray-300 rounded-md"
              ></textarea>
              <button
                onClick={handleSubmit}
                className="mt-4 px-8 py-3 bg-[#fee590] text-black font-semibold rounded-lg shadow-md hover:bg-[#fdda6a]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {showCorrectModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-[#2F1312] p-8 rounded-lg text-center text-[#fee590] shadow-xl modal-container">
            <h2 className="text-3xl font-bold mb-4">Incorrect Answer!</h2>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Correct Answer:</h3>
              <p>{selectedCorrectOption}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">You Selected:</h3>
              <p>{selectedOption}</p>
            </div>
            <button
              onClick={() => {
                setShowCorrectModal(false);
                if (currentQuestion < questions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                  setSelectedOption(null);
                  timer.current = setInterval(() => {
                    // Resume timer when next question is clicked
                    if (timeLeftRef.current > 0) {
                      setTimeLeft((prevTimeLeft) => {
                        timeLeftRef.current = prevTimeLeft - 1; // Update ref with the latest timeLeft value
                        return prevTimeLeft - 1; // Update state
                      });
                    } else {
                      clearInterval(timer.current);
                      setShowGameOverModal(true); // Show game over modal when time is up
                    }
                  }, 1000);
                } else {
                  setShowGameOverModal(true);
                }
              }}
              className="mt-6 px-8 py-3 bg-[#fee590] text-black font-semibold rounded-lg shadow-md hover:bg-[#fdda6a]"
            >
              {currentQuestion === questions.length - 1 ? "Game Over" : "Next"}
            </button>
          </div>
        </div>
      )}
      <div className="p-6 rounded-md w-full flex justify-center items-center flex-col">
        <h2 className="text-3xl font-semibold mb-8 text-[#fee590]">
          {questions[currentQuestion].question}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.isCorrect, option.text)}
              className={`w-full col-span-1 px-6 py-3 ${
                selectedOption === option.text
                  ? option.isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-[#fee590] text-black"
              } font-semibold rounded-lg shadow-md`}
              disabled={selectedOption !== null}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
