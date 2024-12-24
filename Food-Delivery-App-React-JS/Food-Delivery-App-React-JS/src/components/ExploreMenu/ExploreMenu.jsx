import React, { useState, useEffect } from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory, hotel }) => {
  const [list, setList] = useState(menu_list);

  useEffect(() => {
    if (hotel !== "All") {
      const required_categories = menu_list.filter(
        (item) => item.hotel === hotel
      );
      setList(required_categories);
    }
    if (hotel === "All") {
      setList(menu_list);
    }
  }, [hotel]);

  return (
    <div className="container my-4" id="explore-menu">
      <h1 className="text-dark fw-medium">Explore Our Menu</h1>
      <p className="text-muted text-justify w-60 mx-auto">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div
        className="d-flex align-items-center gap-3 mt-3 overflow-auto"
        style={{ textAlign: "center" }}
      >
        {list.map((item, index) => (
          <div
            key={index}
            className="text-center"
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              src={item.menu_image}
              alt="menu_image"
              className="rounded-circle img-fluid"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                cursor: "pointer",
                border: category === item.menu_name ? "4px solid orange" : "none",
                padding: category === item.menu_name ? "2px" : "0",
              }}
            />
            <p
              className="mt-2 text-muted"
              style={{ fontSize: "clamp(16px, 1.2vw, 20px)", cursor: "pointer" }}
            >
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-3 border-2 text-secondary" />
    </div>
  );
};

export default ExploreMenu;
