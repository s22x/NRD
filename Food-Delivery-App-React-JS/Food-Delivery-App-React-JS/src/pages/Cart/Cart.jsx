import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import {
  useGetCartListQuery,
  useUpdateFoodItemMutation,
} from "../../redux/api/food";
import { ClipLoader } from "react-spinners";

export const deliveryFee = 2;

const Cart = () => {
  const { removeFromCart, getTotalCartAmount, getTotalQuantity } =
    useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();

  const { data: cartList, isFetching: isCartLoading } = useGetCartListQuery();
  const [removeItem] = useUpdateFoodItemMutation();

  useEffect(() => {
    let totalPrice = 0;
    cartList?.cart_items?.forEach((item) => {
      totalPrice += item.price * item.item_quantity;
    });
    localStorage.setItem("totalPrice", totalPrice);

    localStorage.setItem("isCart", cartList?.cart_items?.length ? "1" : "0");
  }, [cartList, removeItem]);

  if (isCartLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4">Shopping Cart</h2>
          <div className="row text-muted border-bottom pb-2">
            <div className="col-4">Name</div>
            <div className="col-2">Price</div>
            <div className="col-2">Quantity</div>
            <div className="col-2">Total</div>
            <div className="col-2">Remove</div>
          </div>
          {cartList?.cart_items?.map((item) => (
            <div key={item._id} className="row align-items-center border-bottom py-2">
              <div className="col-4">{item.name}</div>
              <div className="col-2">${item.price}</div>
              <div className="col-2">{item.item_quantity}</div>
              <div className="col-2">${item.price * item.item_quantity}</div>
              <div className="col-2">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    const data = {
                      food_item_id: item.id,
                      is_cart: false,
                      quantity: 0,
                    };
                    removeItem(data);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 text-end">
          <button
            onClick={() => navigate("/order")}
            className="btn btn-primary"
            disabled={!cartList?.cart_items?.length}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
