import React, { useEffect } from "react";
import { assets, getImageSrc } from "../../assets/assets";
import {
  useUpdateFoodItemMutation,
  useGetCartListQuery,
} from "../../redux/api/food";

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  isCart,
  isQuantity,
}) => {
  const [updateCart] = useUpdateFoodItemMutation();
  const { data: cartList } = useGetCartListQuery();

  const addToCart = (itemId) => {
    const data = {
      food_item_id: itemId,
      is_cart: true,
      quantity: isQuantity + 1,
    };
    updateCart(data);
  };

  const removeFromCart = (itemId) => {
    const data = {
      food_item_id: itemId,
      is_cart: isQuantity === 1 ? false : true,
      quantity: isQuantity - 1,
    };
    updateCart(data);
  };

  useEffect(() => {
    if (cartList?.cart_items?.length > 0) {
      localStorage.setItem("isCart", "1");
    } else if (cartList?.cart_items?.length === 0) {
      localStorage.setItem("isCart", "0");
    }
  }, [cartList]);

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: "16px",
        transition: "box-shadow 0.3s",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.boxShadow = "0px 0px 20px rgba(255, 99, 71, 0.45)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.15)")
      }
    >
      <div
        className="position-relative overflow-hidden"
        style={{ borderRadius: "16px 16px 0 0" }}
      >
        <img
          src={getImageSrc(image)}
          alt="Food"
          className="card-img-top"
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        {!isCart && isQuantity === 0 ? (
          <img
            src={assets.add_icon_white}
            alt="Add"
            className="position-absolute"
            style={{
              width: "35px",
              bottom: "15px",
              right: "15px",
              cursor: "pointer",
              borderRadius: "50%",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => addToCart(id)}
          />
        ) : (
          <div
            className="position-absolute d-flex align-items-center gap-2 px-2"
            style={{
              bottom: "15px",
              right: "15px",
              borderRadius: "50px",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={assets.remove_icon_red}
              alt="Remove"
              style={{ width: "30px", cursor: "pointer" }}
              onClick={() => removeFromCart(id)}
            />
            <p className="m-0">{isQuantity}</p>
            <img
              src={assets.add_icon_green}
              alt="Add"
              style={{ width: "30px", cursor: "pointer" }}
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-baseline mb-3">
          <p className="h6 m-0">{name}</p>
          <img src={assets.rating_starts} alt="Rating" className="w-25" />
        </div>
        <p className="text-muted small text-justify">{description}</p>
        <p className="text-primary fw-bold mt-2">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
