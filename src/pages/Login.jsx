import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Button, Input } from "../components";
import classes from "./Login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", formData);

      // Handle login logic here
    }, 1000);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Handle forgot password logic here
  };

  const handleRegister = () => {
    console.log("Register clicked");
    // Handle register navigation here
  };

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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <div className={`${classes["form-container"]}`}>
            {/* Email Field */}
            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              required
              icon={Mail}
              className={`${classes["input-between-space"]}`}
              //   value={formData.email}
              //   onChange={handleInputChange}
            />

            {/* Password Field */}
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              required
              icon={Lock}
              className={`${classes["input-between-space"]}`}
              //   value={formData.password}
              //   onChange={handleInputChange}
            />

            {/* Submit Button */}
            <Button onClick={handleSubmit}>Sign In</Button>
          </div>

          {/* Footer Links */}
          <div className="mt-6">
            {/* Forgot Password */}
            <div className="text-center mb-4">
              <button
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot your password?
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={handleRegister}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Create one now
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
