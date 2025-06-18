import React, { useState } from "react";
import classes from "./Login.module.css";
import { User, Mail, Lock } from "lucide-react";
import { Button, Input, Loader } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const account = await authService.createAccount(
        formData.email,
        formData.password,
        formData.name
      );

      if (account) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Appwrite :: Error creating account:", error.message);
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div
      className={
        "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      }
    >
      <div className="max-w-md w-full">
        <div
          className={`bg-white shadow-md rounded-lg ${classes["login-container"]}`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
            <p className="text-gray-600 text-sm">
              Create an account to continue
            </p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          {/* Form */}
          <form
            className={`${classes["form-container"]}`}
            onSubmit={handleSubmit}
          >
            {/* Name field  */}
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              name="name"
              type="text"
              required
              icon={User}
              className={`${classes["input-between-space"]}`}
              value={formData.name}
              onChange={handleInputChange}
            />
            {/* Email Field */}
            <Input
              label="Email Address"
              placeholder="Enter your email"
              name="email"
              type="email"
              required
              icon={Mail}
              className={`${classes["input-between-space"]}`}
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* Password Field */}
            <Input
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              required
              icon={Lock}
              className={`${classes["input-between-space"]}`}
              value={formData.password}
              onChange={handleInputChange}
            />

            <Button type="submit">Sign Up</Button>
          </form>

          {/* Footer Links */}

          {/* Divider */}
          <hr className={`${classes["divider"]}`} />
          <p className="text-center text-gray-500">or</p>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already an user?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
