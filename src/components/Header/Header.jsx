import React from "react";
import { Button, UserInfoDropdown } from "..";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "@/appwrite/auth";
import { logout } from "@/store/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.userData);

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 shadow-lg !px-4 !sm:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left side  */}
        <div className="flex items-center !space-x-4 !sm:space-x-6">
          <NavLink to={"/"}>
            <div className="text-xl font-bold text-white">
              Efootball Tracker
            </div>
          </NavLink>

          <NavLink
            className="text-gray-300 hover:text-white font-medium transition-colors"
            to={"/"}
          >
            Home
          </NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center !space-x-4">
          {authStatus ? (
            <UserInfoDropdown user={user}>
              <div className="!p-2">
                <p className="text-center !mb-2 text-xl">
                  {user?.name.toUpperCase()}
                </p>
                <Button onClick={handleLogout}>Log out</Button>
              </div>
            </UserInfoDropdown>
          ) : (
            <NavLink to={"/login"}>
              <Button>Login</Button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
