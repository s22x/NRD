import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [login, { error: loginError, isLoading: loginLoading }] =
    useLoginMutation();
  const [register, { error: registerError, isLoading: registerLoading }] =
    useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentState === "Sign up") {
      try {
        await register({ username: name, email, password }).unwrap();
        setCurrentState("Login");
        // Handle successful registration (e.g., redirect to login or show success message)
      } catch (err) {
        console.error("Registration failed:", err);
      }
    } else {
      try {
        await login({ username: name, password })
          .unwrap()
          .then((r) => {
            console.log(r)
            if (r.user) {
              localStorage.setItem("username", r.user);
              localStorage.setItem("user_token", r.token);
            }
            navigate("/");
          });
        // Handle successful login (e.g., redirect to dashboard or show success message)
      } catch (err) {
        console.error("Login failed:", err);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="bg-white p-4 rounded shadow-sm"
        style={{ width: "350px" }}
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark">{currentState}</h2>
        </div>

        {/* Inputs */}
        <div className="d-flex flex-column gap-3 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {currentState === "Sign up" && (
            <input
              type="email"
              className="form-control"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
          style={{ fontSize: "16px" }}
          disabled={loginLoading || registerLoading}
        >
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>

        {/* Terms and Conditions */}
        {currentState === "Sign up" && (
          <div className="d-flex align-items-start gap-2 mb-3">
            <input type="checkbox" className="form-check-input mt-1" required />
            <p className="mb-0">
              By continuing, I agree to the terms of use & privacy policy
            </p>
          </div>
        )}

        {/* Switch State */}
        {currentState === "Login" ? (
          <p className="text-center mb-0">
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Sign up")}
              style={{ color: "orangered", cursor: "pointer" }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center mb-0">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              style={{ color: "orangered", cursor: "pointer" }}
            >
              Login here
            </span>
          </p>
        )}

        {/* Error Messages */}
        {loginError && <p className="text-danger">{loginError.message}</p>}
        {registerError && (
          <p className="text-danger">{registerError.message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
