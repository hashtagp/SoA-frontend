import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Menu, X } from 'lucide-react';
import logo from '../assets/logo.svg';
import SignIn from '../pages/auth/SignIn';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <motion.div 
          className="navbar-container"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="nav-logo">
              <motion.img
                src={logo}
                alt="NATA Prep Logo"
                className="logo-image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.span 
                className="brand-name"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
              </motion.span>
            </Link>
          </div>

          <div className="nav-links-desktop">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/instruction" className="nav-link">Practice Test</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="auth-button"
              onClick={() => setShowAuthModal(true)}
            >
              <User className="user-icon" />
            </motion.button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div 
          className={`mobile-menu ${isOpen ? 'open' : ''}`}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="mobile-link">Home</Link>
          <Link to="/about" className="mobile-link">About</Link>
          <Link to="/instruction" className="mobile-link">Practice Test</Link>
          <button 
            className="mobile-auth-button"
            onClick={() => {
              setShowAuthModal(true);
              setIsOpen(false);
            }}
          >
            Sign In
          </button>
        </motion.div>
      </nav>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <SignIn 
            onClose={() => setShowAuthModal(false)} 
            returnPath={location.pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;