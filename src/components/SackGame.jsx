import React, { useState, useEffect, useRef } from 'react';
import backgroundImage from '../assets/Websitebg.jpg';
import bagImage from '../assets/cementbag.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SackGame = ({host}) => {
  const [bags, setBags] = useState([
    { id: 1, position: 0 },
    { id: 2, position: -300 },
    { id: 3, position: -600 },
    // {id:4, position: -900},
    // {id:5, position: -800},
    // {id:6, position: -1500},
  ]);
  const [boxPosition, setBoxPosition] = useState(0);
  const [boxWidth, setBoxWidth] = useState(200);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [bagSpeed, setBagSpeed] = useState(35);
  const [bagMoving, setBagMoving] = useState(true);
  const [loading, setLoading] = useState(false);

  const intervalRef = useRef(null); // Define intervalRef
  const navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
      const issack = localStorage.getItem('sack');
      if (!userId) {
        navigate("/"); // If userId exists, navigate to home page
      }
      if(issack){
        navigate('/home')
      }
    }, []);
  const timer = useRef(null); // Use useRef for the timer

  useEffect(() => {
    const moveBags = () => {
      intervalRef.current = setInterval(() => {
        setBags(prevBags =>
          prevBags.map(bag => ({
            ...bag,
            position: bagMoving && !gameOver ? (bag.position >= window.innerWidth + 150 ? -300 : bag.position + bagSpeed) : bag.position
          }))
        );
      }, 50);
    };

    if (!gameOver) {
      moveBags();
    }

    // Clear interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [gameOver, bagSpeed, bagMoving]);

  useEffect(() => {
    if (time === 0) {
      setGameOver(true);
      clearInterval(timer.current);
    }
  }, [time, score]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setBoxPosition((window.innerWidth - boxWidth) / 2);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [boxWidth]);

  useEffect(() => {
    if (time && time % 10 === 0) {
      setBagSpeed(prevSpeed => prevSpeed + 5);
    }
  }, [time]);

  const handleMouseDown = () => {
    if (!isMobile()) {
      const bagInBox = bags.find(bag => {
        const leftEdge = bag.position - 75; // Adjusted for bag width
        const rightEdge = bag.position + 75; // Adjusted for bag width
        const boxLeftEdge = boxPosition;
        const boxRightEdge = boxPosition + boxWidth;
        return leftEdge >= boxLeftEdge && rightEdge <= boxRightEdge;
      });
    
      if (bagInBox) {
        setScore(prevScore => prevScore + 1); // Increase score if entire bag is inside the box
      }
    
      clearInterval(intervalRef.current); // Clear the interval
      setBagMoving(false);
    }
  };

  const handleMouseUp = () => {
      setBagMoving(true); // Resume bag movement
  };

  const handleTouchStart = (event) => {
    event.preventDefault(); // Prevent default touch event actions like copy-paste or select
    const bagInBox = bags.find(bag => {
      const leftEdge = bag.position - 75; // Adjusted for bag width
      const rightEdge = bag.position + 75; // Adjusted for bag width
      const boxLeftEdge = boxPosition;
      const boxRightEdge = boxPosition + boxWidth;
      return leftEdge >= boxLeftEdge && rightEdge <= boxRightEdge;
    });
  
    if (bagInBox) {
      setScore(prevScore => prevScore + 1); // Increase score if entire bag is inside the box
    }
  
    clearInterval(intervalRef.current); // Clear the interval
    setBagMoving(false);
  };

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleQuit = async() => {
    // Redirect to the home page or "/" route
    setLoading(true); // Set loading state to true
    try {
      const userId = localStorage.getItem("userId");
      const data = {
        score
      }      
      const response = await axios.put(`${host}/api/users/snapscore/${userId}`, data);
      if(response.status ===200){
        localStorage.setItem("sack", true);
        navigate("/thank");
      }else{
        alert("Error in submitting the Score. Please retry.");
        setLoading(false);
      }
    } catch(error) {
      alert("Error in submitting the Score. Please retry.");
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-screen overflow-hidden"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        userSelect: 'none'// Add touch-action CSS property
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
    >
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center border-10 border-white">
        {/* Render bags */}
        {bags.map((bag, index) => (
          <img
            key={bag.id}
            src={bagImage} // Add the path to your bag image
            alt="Bag"
            className="absolute"
            style={{
              top: '50%',
              left: bag.position,
              transform: 'translate(-50%, -50%)',
              width: '250px', // Adjust size as needed
              height: '300px' // Adjust size as needed
            }}
          />
        ))}
        <div
          className={`absolute left-[${boxPosition}] w-[320px] h-[350px] border-[8px] border-[#fee590]`}
        ></div>
        <div className="absolute top-0 right-0 m-4 text-white">
          <p>Score: {score}</p>
          <p>
            Time: {Math.floor(time / 60).toString().padStart(2, '0')}:
            {(time % 60).toString().padStart(2, '0')}
          </p>
        </div>
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-[#fee590] text-[#160909] p-[25px] rounded text-center">
            <p className='text-3xl  my-2 mx-2'>Game Over!</p>
            <p  className='text-2xl my-2 mx-2'>Score: {score}</p>
            <button className="px-4 py-2 bg-[#160909] text-[#fee590] rounded text-xl mt-3 text-center" onClick={handleQuit} disabled={loading}>
             {loading ? 'Loading...' : 'Quit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SackGame;