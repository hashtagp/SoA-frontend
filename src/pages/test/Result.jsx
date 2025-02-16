import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Clock, BarChart2, RefreshCcw, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Result.css';

const Result = ({ onRetry }) => {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/test/result', { withCredentials: true });
        setResultData(response.data);
      } catch (error) {
        console.error('Error fetching result data:', error);
      }
    };

    fetchResultData();
  }, []);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const { correctAnswers, totalQuestions } = resultData;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#22c55e';
    if (percentage >= 60) return '#eab308';
    return '#ef4444';
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'Outstanding';
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 70) return 'Very Good';
    if (percentage >= 60) return 'Good';
    if (percentage >= 50) return 'Average';
    return 'Needs Improvement';
  };

  const incorrectAnswers = totalQuestions - correctAnswers;
  const unattempted = 0; // Assuming all questions were attempted

  return (
    <motion.div 
      className="result-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-content">
        <motion.div 
          className="score-card"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="score-circle" style={{ 
            background: `conic-gradient(${getScoreColor(percentage)} ${percentage}%, #1e293b 0)` 
          }}>
            <div className="score-inner">
              <motion.span 
                className="score-percentage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {percentage}%
              </motion.span>
              <Award className="score-icon" style={{ color: getScoreColor(percentage) }} />
            </div>
          </div>
          <motion.h2 
            className="grade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {getGrade(percentage)}
          </motion.h2>
        </motion.div>

        <div className="stats-grid">
          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BarChart2 className="stat-icon" />
            <div className="stat-content">
              <h3>Total Questions</h3>
              <p>{totalQuestions}</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="analytics-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="analytics-title">Detailed Analysis</h3>
          <div className="analytics-grid">
            <div className="analytics-card correct">
              <CheckCircle className="analytics-icon" />
              <div className="analytics-content">
                <span className="analytics-label">Correct</span>
                <span className="analytics-value">{correctAnswers}</span>
              </div>
            </div>
            <div className="analytics-card incorrect">
              <XCircle className="analytics-icon" />
              <div className="analytics-content">
                <span className="analytics-label">Incorrect</span>
                <span className="analytics-value">{incorrectAnswers}</span>
              </div>
            </div>
            <div className="analytics-card unattempted">
              <div className="analytics-content">
                <span className="analytics-label">Unattempted</span>
                <span className="analytics-value">{unattempted}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="action-buttons">
          <motion.button 
            className="retry-button"
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCcw size={20} />
            Retry Test
          </motion.button>
          <Link to="/">
            <motion.button 
              className="home-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Result;