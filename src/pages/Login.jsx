import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Button, Input, Loader } from "../components";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "@/appwrite/auth";
import { login } from "@/store/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { email, password } = formData;

      const session = await authService.login({ email, password });

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message || "Login failed. Something went wrong!");
      console.log("Error during login:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Handle forgot password logic here
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          {/* Form */}
          <div className={`${classes["form-container"]}`}>
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
            <hr className={`${classes["divider"]}`} />
            <p className="text-center text-gray-500">or</p>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to={"/signup"}>
                  <button className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    Create one now
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
