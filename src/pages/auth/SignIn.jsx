import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SignIn.css';

const SignIn = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);

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
            <button className="close-button" onClick={onClose}>×</button>
          </div>

          <motion.div 
            className="auth-form-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isSignIn ? (
              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter your password"
                    className="form-input"
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
              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="Create a password"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    placeholder="Confirm your password"
                    className="form-input"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Create Account
                </button>
              </form>
            )}
          </motion.div>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="social-auth">
            <button className="social-button google">
              <img src="/google-icon.svg" alt="Google" />
              Google
            </button>
            <button className="social-button github">
              <img src="/github-icon.svg" alt="GitHub" />
              GitHub
            </button>
          </div>
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
