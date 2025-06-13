import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 !px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left side - Copyright */}
        <div className="text-gray-400 text-sm">
          © 2025, Mostafa Rakib. All rights reserved.
        </div>

        {/* Right side - Links */}
        <div className="flex items-center !space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
