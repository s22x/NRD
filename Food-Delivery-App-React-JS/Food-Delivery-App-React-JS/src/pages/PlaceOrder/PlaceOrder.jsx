import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    setIsOrderPlaced(true);
  };

  return (
    <div className="container mt-5">
      {isOrderPlaced ? (
        <div className="text-center">
          <h2 className="text-success">Order Successful!</h2>
          <p>Thank you for your order. Here are your order details:</p>
          <div className="border p-3 rounded">
            <p>
              <strong>Order ID:</strong> {orderId}
            </p>
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Address:</strong> {formData.street}, {formData.city},{" "}
              {formData.state} - {formData.zip}, {formData.country}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Total Amount:</strong> $
              {Number(localStorage.getItem("totalPrice") || 0) + 20}
            </p>
          </div>
          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate("/cart")}
          >
            ⬅️ Go Back to Cart Page
          </button>
          <form className="row g-4">
            {/* Delivery Information */}
            <div className="col-lg-6">
              <h2 className="mb-4">Delivery Information</h2>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <input
                type="email"
                className="form-control mt-3"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
              />
              <input
                type="text"
                className="form-control mt-3"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Street"
                required
              />
              <div className="row g-3 mt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                  />
                </div>
              </div>
              <div className="row g-3 mt-3">
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="Zip Code"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    required
                  />
                </div>
              </div>
              <input
                type="number"
                className="form-control mt-3"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                required
              />
            </div>

            {/* Cart Total */}
            <div className="col-lg-6">
              <h2 className="mb-4">Cart Total</h2>
              <div className="border p-3 rounded">
                <div className="d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p>${localStorage.getItem("totalPrice") || 0}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>Delivery Fee</p>
                  <p>$20</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <p>Total</p>
                  <p>
                    $
                    {localStorage.getItem("totalPrice")
                      ? Number(localStorage.getItem("totalPrice")) + 20
                      : 0}
                  </p>
                </div>
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={handlePlaceOrder}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
