import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container">
        <div className="row">
          {/* 브랜드 정보 */}
          <div className="col-md-3">
            <h5>F(X)</h5>
            <p>Your trusted currency exchange platform</p>
          </div>
          {/* Quick Links */}
          <div className="col-md-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Support
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-bold">Contact</h6>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-envelope-fill me-2"></i>
                support@fx.com
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2"></i>
                +1 234 567 890
              </li>
            </ul>
          </div>
          {/* Follow Us */}
          <div className="col-md-3">
            <h6 className="fw-bold">Follow Us</h6>
            <a href="#" className="text-white text-decoration-none me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-white text-decoration-none me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-white text-decoration-none">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="text-center mt-3 border-top pt-3">© 2025 F(X). All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
