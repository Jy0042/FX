import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <p>F(X)</p>
          <p>Your trusted currency exchange platform</p>
        </div>
        <div className="footer-links">
          <div className="quick-links">
            <h4>Quick Links</h4>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/support">Support</a>
          </div>
          <div className="contact">
            <h4>Contact</h4>
            <p>Email: support@fx.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div className="social-links">
            <h4>Follow Us</h4>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://facebook.com">Facebook</a>
            <a href="https://linkedin.com">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 F(X). All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
