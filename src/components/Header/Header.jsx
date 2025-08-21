import React, { useEffect, useState } from "react";
import { Button, PredictionDropdown, UserInfoDropdown } from "..";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { Menu, Play, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Nav brand */}
          <NavLink to={"/"} onClick={() => setIsMenuOpen(false)}>
            {" "}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                eFootball Tracker
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to={"/gameBoxTracker"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Game Box Tracker
            </NavLink>
            {authStatus && <PredictionDropdown></PredictionDropdown>}
            <NavLink
              to={"/about"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </NavLink>

            {authStatus ? (
              <UserInfoDropdown user={user}>
                <div className="p-2">
                  <p className="text-center mb-2 font-bold">
                    {user?.name.toUpperCase() || "User"}
                  </p>
                  <Button className="w-full" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              </UserInfoDropdown>
            ) : (
              <NavLink
                to={"/login"}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2">
              {authStatus && (
                <PredictionDropdown>
                  {/* inside will be modal contents */}
                </PredictionDropdown>
              )}
            </div>
            <NavLink
              to={"/gameBoxTracker"}
              className="block px-3 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Game Box Tracker
            </NavLink>
            <NavLink
              to={"/about"}
              className="block px-3 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              About
            </NavLink>
            {authStatus ? (
              <div>
                <p className="block px-3 py-2 text-gray-300 hover:text-white font-bold">
                  {user?.name.toUpperCase() || "User"}
                </p>
                <span className="block px-3 py-2">
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen((prev) => !prev);
                    }}
                  >
                    Log out
                  </Button>
                </span>
              </div>
            ) : (
              <NavLink
                onClick={() => setIsMenuOpen((prev) => !prev)}
                to={"/login"}
              >
                <Button>Login</Button>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
