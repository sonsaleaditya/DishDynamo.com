import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put('/auth/forgotpassword',formData); // Add body if needed
    
      const data = response.data;
    
      if (data.userNotExist) {
        toast.warn("User does not exist.");
        return;
      }
    
      if (data.success) {
        setMessage(data.message);
        toast.success("Password updated successfully");
    
        setTimeout(() => {
          window.location.href = "/login";
        }, 4000);
      } else {
        setMessage(data.message || "Failed to update password.");
        toast.error("Error in password update.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while updating the password.");
      toast.error("Something went wrong.");
    }
    
  };

  return (
    <div className="update-password-container">
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {message && <p className="error-message">{message}</p>}
      <ToastContainer />
    </div>
  );
};

export default UpdatePassword;
