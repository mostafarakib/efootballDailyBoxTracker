import React from "react";
import classes from "./Login.module.css";
import { User, Mail, Lock } from "lucide-react";
import { Button, Input } from "../components";
import { Link } from "react-router-dom";

function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      console.log("Signup attempt");
      // Handle signup logic here
    }, 1000);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
            <p className="text-gray-600 text-sm">
              Create an account to continue
            </p>
          </div>

          {/* Form */}
          <div className={`${classes["form-container"]}`}>
            {/* Name field  */}
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              required
              icon={User}
              className={`${classes["input-between-space"]}`}
            />
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
            <Button onClick={handleSubmit}>Sign Up</Button>
          </div>

          {/* Footer Links */}

          {/* Divider */}
          <hr className={`${classes["divider"]}`} />
          <p className="text-center text-gray-500">or</p>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already an user? {/* <Link to={"/login"}> */}
              <button className="font-medium text-blue-600 hover:text-blue-500">
                Login here
              </button>
              {/* </Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
