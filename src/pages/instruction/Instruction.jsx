import axios from "axios";
import "./Instruction.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Instruction = () => {
  const [isStarting, setIsStarting] = useState(false);
  const Navigate = useNavigate();

  const handleStartTest = async() => {
    setIsStarting(true);
    try{
    const response = await axios.get("http://localhost:5000/api/test/start", {
      withCredentials: true,
    });
    if (response.data.success) {
      setIsStarting(false);
      Navigate("/test");
    } else {
      alert(response.data.message);
    }
  }
  catch (error) {
    setIsStarting(false);
    alert("An error occurred. Please try again later.");
  }
  };

  return (
    <div className="test-container">
      <div className="test-box">
        <h1>Welcome to the Test Platform</h1>
        
        <div className="instructions">
          <h2>NATA Test Instructions</h2>
          <ul>
            <li>The test consists of multiple-choice and drawing questions.</li>
            <li>You will have 3 hours to complete the test.</li>
            <li>Ensure you have a stable internet connection.</li>
            <li>Use a dark pencil for sketching in drawing-based questions.</li>
            <li>No electronic gadgets are allowed during the test.</li>
            <li>Click "Start Test" when you are ready.</li>
          </ul>
        </div>
        <p>Ready to test your knowledge?</p>
        <button 
          className={`start-button ${isStarting ? "disabled" : ""}`}
          onClick={handleStartTest}
          disabled={isStarting}
        >
          {isStarting ? "Starting Test..." : "Start Test"}
        </button>
      </div>
    </div>
  );
};

export default Instruction;