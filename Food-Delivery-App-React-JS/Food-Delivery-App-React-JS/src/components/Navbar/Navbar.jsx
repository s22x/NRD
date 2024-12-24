import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Import your custom CSS
import { assets } from "../../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const { getTotalQuantity } = useContext(StoreContext);
  const [username, setUsername] = useState("");
  
  // const user = localStorage.getItem("username");
  const [user, setUser] = useState(localStorage.getItem("username"));

  const totalQuantity = getTotalQuantity();
  console.log(user);
  const [menu, setMenu] = useState("home");

  // Check if token exists in local storage on component mount
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    }
    console.log(token);
  }, [user,navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user_token"); // Remove the user token
    localStorage.removeItem("username"); // Remove the username
    setUser(null); // Update the user state
    navigate("/login", { replace: true }); // Redirect to the login page
  };
  

  return (
    <nav className="navbar navbar-expand-lg px-4 py-2">
      {/* Brand/Logo */}
      <Link to="/" className="navbar-brand">
        <h1 className="logo" style={{ color: "var(--primary)" }}>
          EatXpress
        </h1>
      </Link>

      {/* Hamburger Menu for Mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={`nav-link ${
                menu === "home"
                  ? "active text-primary border-bottom"
                  : "text-dark"
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a
              href="#hotels"
              onClick={() => setMenu("hotels")}
              className={`nav-link ${
                menu === "hotels"
                  ? "active text-primary border-bottom"
                  : "text-dark"
              }`}
            >
              Hotels
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={`nav-link ${
                menu === "menu"
                  ? "active text-primary border-bottom"
                  : "text-dark"
              }`}
            >
              Menu
            </a>
          </li>
          {user === "admin" && (
            <li className="nav-item">
              <Link
                to="/list"
                onClick={() => setMenu("list")}
                className={`nav-link ${
                  menu === "list"
                    ? "active text-primary border-bottom"
                    : "text-dark"
                }`}
              >
                Registered list
              </Link>
            </li>
          )}
          <li className="nav-item">
            <a
              href="#footer"
              onClick={() => setMenu("contact-us")}
              className={`nav-link ${
                menu === "contact-us"
                  ? "active text-primary border-bottom"
                  : "text-dark"
              }`}
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Right Section: Cart and Sign In */}
        <div className="d-flex align-items-center">
          {/* Cart Icon */}
          <Link to="/cart" className="position-relative me-3">
            <img
              src={assets.basket_icon}
              alt="Basket"
              width="25"
              className="basket-icon"
            />
            {/* {localStorage.getItem("isCart") === "1" && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {totalQuantity}
              </span>
            )} */}
          </Link>

          {/* Sign In Button */}

           {/* User Actions */}
           {user ? (
            <>
              {/* Show Logout Button */}
              <button
                className="btn btn-outline-primary rounded-pill px-4"
                onClick={handleLogout}
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                  backgroundColor: "transparent",
                }}
              >
                Logout
              </button>
              <p className="btn btn-outline-primary rounded-pill px-4 m-0 ms-2">
                {user}
              </p>
            </>
          ) : (
            // Show Login Button
            <button
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() => navigate("/login")}
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
                backgroundColor: "transparent",
              }}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
