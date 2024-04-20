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
      question: "Is this image of a cat?",
      options: [
        { text: "Yes", isCorrect: true },
        { text: "No", isCorrect: false },
        { text: "Maybe", isCorrect: false },
        { text: "Maybe", isCorrect: false },
      ],
    },
    {
      question: "Is this object a car?",
      options: [
        { text: "Yes", isCorrect: false },
        { text: "No", isCorrect: true },
        { text: "Maybe", isCorrect: false },
        { text: "Maybe", isCorrect: false },
      ],
    },
    {
      question: "Is this object a bike?",
      options: [
        { text: "Yes", isCorrect: false },
        { text: "No", isCorrect: false },
        { text: "Maybe", isCorrect: true },
        { text: "Maybe", isCorrect: false },
      ],
    },
    // Add more questions here
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
        QUIZ
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
