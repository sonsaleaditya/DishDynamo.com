import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import { api } from "../api";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const Email = email.toLowerCase();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowError(true);
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: Email,
        password,
      });
    
      const data = response.data;
    
      if (data.userNotExist) {
        toast.warn("User does not exist. Please register.");
        return;
      }
    
      if (data.passNotMatch) {
        toast.warn("Incorrect password.");
        return;
      }
    
      if (data.success) {
        toast.success("Login successful.");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      } else {
        console.error("Failed to sign in user:", data.status);
      }
    } catch (e) {
      toast.error("An error occurred while signing in.");
      console.error("Sign-in error:", e);
    }
    
  };

  return (
    <div className="SignupContainer">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>

        <Link to="/forgotPassword">Forgot Password</Link>
      </form>
      {showError && (
        <span className="fill-fields-error">Please Fill all the fields</span>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
