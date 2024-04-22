import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Thank from "./components/Thank";
import Register from "./components/Register";
import SackGame from "./components/SackGame";
import UploadVideo from "./components/UploadVideo";
import UploadImage from "./components/UploadImage";
import Leaderboard from "./components/Leaderboard";
import UploadFile from "./components/UploadFile";
import StartQuiz from "./components/StartQuiz";
import StartSnap from "./components/StartSnap";
import Quizinstr from "./components/QuizInstr";
import SnapInstr from "./components/SnapInstr";

const App = () => {
  const host = "https://ultratechbackend.shobizgames.com"
  // const host = "http://localhost:3000"
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register host={host}/>} />
        <Route path="/quiz" element={<Quiz host={host}/>} />
        <Route path="/thank" element={<Thank />} />
        <Route path="/home" element={<Home />} />
        <Route path="/snapthebag" element={<SackGame host={host}/>} />
        <Route path="/uploadvideo" element={<UploadVideo host={host}/>} />
        <Route path="/uploadimage" element={<UploadImage host={host}/>} />
        <Route path="/leaderboard" element={<Leaderboard host={host}/>} />
        <Route path="/uploadfile" element={<UploadFile host={host}/>} />
        <Route path="/start" element={<StartQuiz host={host}/>} />
        <Route path="/startsnap" element={<StartSnap host={host}/>} />
        <Route path="/quizinst" element={<Quizinstr host={host}/>} />
        <Route path="/snapinst" element={<SnapInstr host={host}/>} />


      </Routes>
    </Router>
  );
};

export default App;
