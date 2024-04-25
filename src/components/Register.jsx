import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "../assets/loginpage.png"; // Import background image
import submitButton from "../assets/Sumit.png"; // Import submit button image
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.png'

const Register = ({host}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    number: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Check localStorage for userId on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/home"); // If userId exists, navigate to home page
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the input field is "number" and the length of the value exceeds 10
    if (name === "number" && value.length > 10) {
      // If the length exceeds 10, only take the first 10 characters
      setFormData((prevState) => ({
        ...prevState,
        [name]: value.slice(0, 10),
      }));
    } else {
      // Otherwise, update the state normally
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
        setError("Error registering! Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      // Handle errors
      setError("Error registering! Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-cover w-screen `}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="my-[10px]">
        <img className="w-[230px]" src={logo} alt="" />
      </div>
      <form onSubmit={handleSubmit} className="p-6 rounded-md w-[400px] flex flex-col justify-center items-center">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Name with Surname"
          className="w-full mb-4 p-2 text-4xl rounded-xl border-4 border-[#D2A561] bg-black bg-opacity-50 text-[#fee590] placeholder-[#887842] text-center"
          style={{ outline: "none" }} // Remove outline when clicked
        />
        <input
          type="text" // Changed input type to text
          name="number"
          value={formData.number}
          required
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-full mb-4 p-2 text-4xl rounded-xl border-4 border-[#D2A561] bg-black bg-opacity-50 text-[#fee590] placeholder-[#887842] text-center"
          style={{ outline: "none" }} // Remove outline when clicked
          pattern="\d{10}" // Added pattern attribute for 10 digits
          title="Please enter a 10-digit number" // Added title for pattern validation
        />
        <input
          type="text"
          name="region"
          required
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
           <button type="button" className="bg-[#D2A561] text-black px-5 py-2 rounded-md text-xl font-semibold" disabled>
           Processing...
         </button>
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
