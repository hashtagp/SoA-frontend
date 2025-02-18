import '../styles/Footer.css';
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Side - Logo & Description */}
        <div className="footer-left">
          <img src={logo} alt="PrepNATA Logo" className="footer-logo" />
          <p className="footer-desc">
            PrepNATA - Your ultimate platform to prepare for NATA exams with confidence.
          </p>
        </div>

        {/* Right Side - Contact Info */}
        <div className="footer-right">
          <h3 className="contact-heading">Contact Us</h3>
          <p className="contact-item">+91 12000000</p>
          <p className="contact-item">support@prepnata.com</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
      <p className="dev-text">
          Developed by{' '}
          <a 
            href="https://www.instagram.com/novatech_dev_studio?igsh=MXhyN3d0OWM1bjdkZg==" 
            className="nova-tech" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            NovaTech &#8599;
          </a>
        </p>
        <p>© {new Date().getFullYear()} PrepNATA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
