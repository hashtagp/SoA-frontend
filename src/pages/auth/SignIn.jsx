import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/SignIn.css';

const SignIn = ({ onClose, returnPath }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [isSignIn]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', 
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data.success) {
        console.log('Login successful', document.cookie); // Debug cookies
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      if (response.data) {
        setIsSignIn(true);
        console.log('Registration successful');
        console.log(response.data);
        setError('');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleClose = () => {
    onClose();
    if (returnPath !== '/auth') {
      navigate(returnPath);
    }
  };

  return (
    <motion.div 
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="auth-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="auth-content">
          <div className="auth-header">
            <motion.div 
              className="auth-tabs"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                className={`auth-tab ${isSignIn ? 'active' : ''}`}
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab ${!isSignIn ? 'active' : ''}`}
                onClick={() => setIsSignIn(false)}
              >
                Sign Up
              </button>
            </motion.div>
            <button className="close-button" onClick={handleClose}>×</button>
          </div>

          <motion.div 
            className="auth-form-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {error && <div className="error-message">{error}</div>}
            {isSignIn ? (
              <form className="auth-form" onSubmit={handleSignIn}>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-footer">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className="submit-button">
                  Sign In
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleSignUp}>
                <div className="form-group">
                  <label>User Name</label>
                  <input 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input 
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="submit-button">
                  Create Account
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <div className="auth-illustration">
          <div className="illustration-content">
            <h2>{isSignIn ? 'Welcome Back!' : 'Join Us Today!'}</h2>
            <p>
              {isSignIn 
                ? 'Continue your journey to master NATA with our comprehensive practice tests.'
                : 'Start your journey to ace NATA with our expert-crafted mock tests and analytics.'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;