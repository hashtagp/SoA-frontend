import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About NATA Mock Test Platform</h1>
        <p className="subtitle">Preparing Future Architects for Success</p>
      </div>

      <div className="about-section">
        <h2>Who We Are</h2>
        <p>
          As pioneers in NATA examination preparation, we understand the unique challenges faced by architecture aspirants. 
          Our platform is built by a team of experienced architects, educators, and technology experts who are passionate 
          about nurturing the next generation of architectural talent in India. Since our inception, we have helped 
          thousands of students achieve their dreams of pursuing architecture.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          We strive to provide accessible, high-quality NATA preparation resources that empower students to excel in 
          their architectural journey. Our mission is to bridge the gap between aspiration and achievement through 
          innovative learning solutions and comprehensive test preparation.
        </p>
      </div>

      <div className="about-section features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Realistic Mock Tests</h3>
            <p>
              Our mock tests are carefully crafted to match the latest NATA exam pattern, including Drawing Test, 
              Mathematics & General Aptitude, and Architectural Awareness sections.
            </p>
          </div>
          <div className="feature-card">
            <h3>Detailed Analytics</h3>
            <p>
              Track your progress with in-depth performance analysis, sectional scores, time management metrics, 
              and personalized improvement suggestions.
            </p>
          </div>
          <div className="feature-card">
            <h3>Expert Support</h3>
            <p>
              Get guidance from our team of experienced architects and educators through doubt-clearing sessions 
              and personalized feedback on your drawing submissions.
            </p>
          </div>
          <div className="feature-card">
            <h3>Study Resources</h3>
            <p>
              Access comprehensive study materials, video lectures, and practice questions covering all NATA topics 
              and previous year patterns.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Our Approach</h2>
        <p>
          We believe in a holistic approach to NATA preparation that combines:
        </p>
        <ul className="approach-list">
          <li>Systematic coverage of all NATA topics and sections</li>
          <li>Regular practice through mock tests and assignments</li>
          <li>Personalized feedback and performance tracking</li>
          <li>Time management and exam strategy development</li>
          <li>Focus on both theoretical knowledge and practical skills</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Why Choose Us</h2>
        <p>
          With years of expertise in architecture education and NATA preparation, we offer:
        </p>
        <ul className="benefits-list">
          <li>Updated content aligned with the latest NATA patterns</li>
          <li>Flexible learning schedule with 24/7 platform access</li>
          <li>Comprehensive performance analytics and progress tracking</li>
          <li>Expert guidance from experienced professionals</li>
          <li>Affordable packages suitable for all budgets</li>
          <li>Mobile-friendly platform for learning on the go</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
