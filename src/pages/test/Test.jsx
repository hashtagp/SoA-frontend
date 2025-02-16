import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, ArrowLeft, ArrowRight, Send } from "lucide-react";
import "../../styles/Test.css";
import Result from "./Result";
import axios from "axios";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0])); // First question is visited by default
  const [testStartTime, setTestStartTime] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/test/fetch", { withCredentials: true });
        const data = response.data;
        const formattedQuestions = data.testData.map(item => ({
          id: item.questionId._id,
          text: item.questionId.question,
          options: item.questionId.options[0].split(','),
          marks: item.questionId.marks
        }));
        setQuestions(formattedQuestions);
        setAnswers(Array(formattedQuestions.length).fill(null));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saveProgress = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/test/save", {
          userId: "user-id", // Replace with actual user ID
          testData: answers.map((answer, index) => ({
            questionId: questions[index].id,
            chosenAnswer: answer
          })),
          currentDate: new Date().toISOString()
        }, { withCredentials: true });
        console.log("Progress saved:", response.data);
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    };

    const interval = setInterval(saveProgress, 30000); // Save every 30 seconds

    const handleBeforeUnload = (event) => {
      saveProgress();
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [answers, questions]);

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = async (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    // Save progress when an option is selected
    try {
      const response = await axios.post("http://localhost:5000/api/test/save", {
        userId: "user-id", // Replace with actual user ID
        testData: newAnswers.map((answer, index) => ({
          questionId: questions[index].id,
          chosenAnswer: answer
        })),
        currentDate: new Date().toISOString()
      }, { withCredentials: true });
      console.log("Progress saved:", response.data);
    } catch (error) {
      console.error("Error saving progress:", error);
    }

    // Automatically move to next question after 1 second
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        navigateQuestion("next");
      }
    }, 1000);
  };

  const navigateQuestion = direction => {
    let nextIndex = currentQuestion;

    if (direction === "next" && currentQuestion < questions.length - 1) {
      nextIndex = currentQuestion + 1;
    } else if (direction === "prev" && currentQuestion > 0) {
      nextIndex = currentQuestion - 1;
    }

    setCurrentQuestion(nextIndex);
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answers[nextIndex],
    });
    setVisitedQuestions(prev => new Set([...prev, nextIndex]));
  };

  const jumpToQuestion = index => {
    setCurrentQuestion(index);
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answers[index],
    });
    setVisitedQuestions(prev => new Set([...prev, index]));
  };

  const getQuestionStatus = index => {
    if (!visitedQuestions.has(index)) return "not-visited";
    if (answers[index]) return "answered";
    if (markedQuestions.has(index)) return "marked";
    return "not-answered";
  };

  const toggleMarkQuestion = () => {
    setMarkedQuestions(prev => {
      const newMarked = new Set(prev);
      if (newMarked.has(currentQuestion)) {
        newMarked.delete(currentQuestion);
      } else {
        newMarked.add(currentQuestion);
      }
      return newMarked;
    });
  };

  const handleSubmitTest = () => {
    if (!isTestSubmitted) {
      const unansweredCount = answers.filter(a => a === null).length;
      if (unansweredCount > 0 && timeLeft > 0) {
        const confirmSubmit = window.confirm(
          `You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`
        );
        if (!confirmSubmit) return;
      }
      setIsTestSubmitted(true);
      // Calculate final score
      const finalScore = answers.reduce((score, answer, index) => {
        return answer === questions[index].correctAnswer ? score + 1 : score;
      }, 0);
      setScore(finalScore);
    }
  };

  const getQuestionSummary = () => {
    const answered = answers.filter(a => a !== null).length;
    const marked = markedQuestions.size;
    const notVisited = questions.length - visitedQuestions.size;
    const notAnswered = visitedQuestions.size - answered;

    return { answered, marked, notVisited, notAnswered };
  };

  if (isTestSubmitted) {
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        userAnswers={answers}
        questions={questions}
        timeSpent={7200 - timeLeft}
        onRetry={() => setIsTestSubmitted(false)}
      />
    );
  }

  return (
    <motion.div
      className="test-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="test-header">
        <div className="timer-container">
          <Timer className="timer-icon" size={20} />
          <span className="timer-text">{formatTime(timeLeft)}</span>
        </div>
        <div className="question-info">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="test-layout">
        <div className="main-content">
          <div className="question-container">
            <motion.div
              className="question-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="question-number">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion]?.text}
              </div>
              <div className="options-grid">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`option-button ${
                      selectedAnswers[currentQuestion] === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="option-indicator">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="question-palette">
          <h3 className="palette-title">Question Palette</h3>
          <div className="question-grid">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`question-number-btn ${
                  currentQuestion === index ? "current" : ""
                } ${
                  answers[index]
                    ? "answered"
                    : visitedQuestions.has(index)
                    ? "not-answered"
                    : ""
                }`}
                onClick={() => jumpToQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="palette-legend">
            <div className="legend-item">
              <div
                className="legend-color"
                style={{
                  background: "rgba(34, 197, 94, 0.2)",
                  border: "1px solid rgb(34, 197, 94)",
                }}
              ></div>
              <span>Answered</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid rgb(239, 68, 68)",
                }}
              ></div>
              <span>Not Answered</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{
                  background: "rgba(59, 130, 246, 0.3)",
                  border: "1px solid rgb(59, 130, 246)",
                }}
              ></div>
              <span>Current Question</span>
            </div>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={() => navigateQuestion("prev")}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        <button className="submit-button" onClick={handleSubmitTest}>
          Submit Test
        </button>

        <button
          className="nav-button"
          onClick={() => navigateQuestion("next")}
          disabled={currentQuestion === questions.length - 1}
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default Test;