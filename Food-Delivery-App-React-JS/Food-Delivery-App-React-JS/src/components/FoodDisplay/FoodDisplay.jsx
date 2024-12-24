import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ foodItems }) => {
  const { food_list } = useContext(StoreContext);
  let fetched_food = [];
  if (foodItems) {
    fetched_food = foodItems.food_items;
  }

  return (
    <div className="container mt-4" id="food-display">
      <h2 className="fs-3 fw-bold">Top Dishes Near You</h2>
      <div className="row g-4 mt-4">
        {fetched_food.map((item, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <FoodItem
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              isCart={item.is_cart}
              isQuantity={item.item_quantity}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
