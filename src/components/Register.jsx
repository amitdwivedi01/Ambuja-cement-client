import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "../assets/loginpage.png"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import { useNavigate } from "react-router-dom";

const Register = ({host}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    email: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Check localStorage for userId on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/home"); // If userId exists, navigate to home page
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        `${host}/api/users`,
        formData
      );
      if(response.status === 201){
        localStorage.setItem("userId", response.data.existingUser._id);
        setLoading(false);
        // Reset form data after successful submission
        navigate("/home");
      }else if(response.status === 200){
        const userId = response.data._id;
        // Store the user ID in localStorage
        localStorage.setItem("userId", userId);
        setLoading(false);
        // Reset form data after successful submission
        navigate("/home");
      }else{
        alert("Error register!, Please try again in sometime")
        setLoading(false);
      }
    } catch (error) {
      // Handle errors
      alert("Error register!, Please try again in sometime")
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-cover w-screen `}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form onSubmit={handleSubmit} className="p-6 rounded-md w-[400px] ">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 p-2 text-4xl rounded-xl border-4 border-[#D2A561] bg-black bg-opacity-50 text-[#fee590] placeholder-[#887842] text-center"
          style={{ outline: "none" }} // Remove outline when clicked
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-2 text-4xl rounded-xl border-4 border-[#D2A561] bg-black bg-opacity-50 text-[#fee590] placeholder-[#887842] text-center"
          style={{ outline: "none" }} // Remove outline when clicked
        />
        <input
          type="text"
          name="region"
          value={formData.region}
          onChange={handleChange}
          placeholder="Region"
          className="w-full mb-4 p-2 text-4xl rounded-xl border-4 border-[#D2A561] bg-black bg-opacity-50 text-[#fee590] placeholder-[#887842] text-center"
          style={{ outline: "none" }} // Remove outline when clicked
        />
        <button
          type="submit"
          className="bg-transparent border-none relative"
          disabled={loading} // Disable button while loading
        >
          {loading ? ( // Show loading spinner if loading state is true
            <svg
              className="animate-spin h-6 w-6 mr-3 text-white"
              viewBox="0 0 24 24"
            >
             
            </svg>
          ) : (
            <img src={submitButton} alt="Submit" className="w-100 h-auto" />
          )}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default Register;
