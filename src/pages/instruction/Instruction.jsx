import "../style/Instruction.css";
import React, { useState } from "react";


const TestPlatform = () => {
  const [isStarting, setIsStarting] = useState(false);

  const handleStartTest = () => {
    setIsStarting(true);
    // Simulate a delay for starting the test
    setTimeout(() => {
      console.log("Test Started!");
    }, 2000);
  };

  return (
    <div className="test-container">
      <div className="test-box">
        <h1>Welcome to the Test Platform</h1>
        <p>Ready to test your knowledge?</p>
        <button 
          className={`start-button ${isStarting ? "disabled" : ""}`}
          onClick={handleStartTest}
          disabled={isStarting}
        >
          {isStarting ? "Starting Test..." : "Start Test"}
        </button>

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
      </div>
    </div>
  );
};

export default TestPlatform;