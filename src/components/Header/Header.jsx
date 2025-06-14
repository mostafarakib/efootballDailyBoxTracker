import React from "react";
import { Button } from "..";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-gray-900 shadow-lg !px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left side  */}
        <div className="flex items-center !space-x-6">
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
        <div>
          <NavLink to={"/login"}>
            <Button>Login</Button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;
