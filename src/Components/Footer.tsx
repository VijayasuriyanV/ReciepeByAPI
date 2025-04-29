

import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
      <div className="footer-user">
          <p>© 2025 All rights reserved| Very Delicious Food </p>
        </div>
        <ul className="footer-links">
          <li className="footer-link">Privacy</li>
          <li className="footer-link">Terms</li>
          <li className="footer-link">Support</li>
        </ul>

        <div className="footer-social">
          <FaFacebook className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaInstagram className="social-icon" />
        </div>
      </footer>
    </div>
  );
};

export default Footer;

