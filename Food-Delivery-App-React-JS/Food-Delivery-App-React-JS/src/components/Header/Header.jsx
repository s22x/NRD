import React from "react";

const Header = () => {
  return (
    <header
      className="position-relative rounded-4 my-4 mx-auto"
      style={{
        height: "34vw",
        backgroundImage: "url('/header_img.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="position-absolute d-flex flex-column align-items-start"
        style={{
          maxWidth: "50%",
          bottom: "10%",
          left: "6vw",
          animation: "fadeIn 3s",
        }}
      >
        <h2
          className="text-white fw-medium"
          style={{
            fontSize: "clamp(20px, 3.5vw, 40px)",
            textShadow: "4px 4px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Order Your Favourite Food Here
        </h2>
        <p
          className="text-white text-justify d-none d-md-block"
          style={{
            fontSize: "clamp(12px, 1vw, 18px)",
            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <a href="#explore-menu">
          <button
            className="btn"
            style={{
              borderRadius: "50px",
              color: "var(--gray)",
              fontWeight: "500",
              fontSize: "clamp(13px, 1vw, 16px)",
              padding: "clamp(10px, 1vw, 14px) clamp(20px, 2.3vw, 30px)",
              backgroundColor: "#fff",
            }}
          >
            View Menu
          </button>
        </a>
      </div>
    </header>
  );
};

export default Header;
