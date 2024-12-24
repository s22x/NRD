/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { assets } from "../../assets/assets"; // Make sure assets are correctly imported
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer id="footer" className="bg-dark text-white py-5 mt-5" style={{ backgroundColor: "var(--dark)" }}>
      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-lg-6 mb-4 footer-content-left">
            {/* Logo */}
            <h1 className="logo mb-3" style={{ color: "var(--primary)" }}>
              EatXpress
            </h1>
            {/* Description */}
            <p className="text-justify">
              Welcome to EatXpress, your ultimate destination for savoring
              delicious dishes from your favorite restaurants, delivered right
              to your doorstep. Whether you're craving comfort food or exploring
              new cuisines, we've got you covered. Fast, fresh, and tailored to
              your taste—EatXpress redefines online food ordering.
            </p>
            {/* Social Icons */}
            <div className="d-flex gap-3 footer-social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <img src={assets.facebook_icon} alt="facebook" style={{ width: "40px" }} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <img src={assets.twitter_icon} alt="twitter" style={{ width: "40px" }} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <img src={assets.linkedin_icon} alt="linkedin" style={{ width: "40px" }} />
              </a>
            </div>
          </div>

          {/* Center Section (Optional - Left Empty for Now) */}
          <div className="col-lg-3 mb-4 footer-content-center"></div>

          {/* Right Section */}
          <div className="col-lg-3 mb-4 footer-content-right">
            <h2 style={{ color: "var(--primary)" }}>GET IN TOUCH</h2>
            <ul className="list-unstyled">
              <li className="mb-2">
                +973 - 17556751
              </li>
              <li>contact@eatxpress.com</li>
            </ul>
          </div>
        </div>
        {/* Horizontal Divider */}
        <hr style={{ backgroundColor: "var(--gray)" }} />
        {/* Copyright */}
        <p className="text-center mt-3 mb-0" style={{ color: "var(--primary)" }}>
          Copyright 2024 © EatXpress.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
