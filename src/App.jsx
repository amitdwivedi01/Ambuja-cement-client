import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Score from "./components/Score";
import Register from "./components/Register";
import SackGame from "./components/SackGame";
import UploadVideo from "./components/UploadVideo";
import UploadImage from "./components/UploadImage";
import Leaderboard from "./components/Leaderboard";

const App = () => {
  const host = "https://ambujacement.chickenkiller.com"
  // const host = "http://localhost:3000"
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register host={host}/>} />
        <Route path="/quiz" element={<Quiz host={host}/>} />
        <Route path="/result" element={<Score />} />
        <Route path="/home" element={<Home />} />
        <Route path="/snapthebag" element={<SackGame host={host}/>} />
        <Route path="/uploadvideo" element={<UploadVideo host={host}/>} />
        <Route path="/uploadimage" element={<UploadImage host={host}/>} />
        <Route path="/leaderboard" element={<Leaderboard host={host}/>} />



      </Routes>
    </Router>
  );
};

export default App;
