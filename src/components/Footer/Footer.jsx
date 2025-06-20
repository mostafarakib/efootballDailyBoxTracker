import { Play } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* logo  */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              eFootball Tracker
            </span>
          </div>
          {/* other links */}
          <div className="text-gray-400 text-sm">
            © 2025 eFootball Tracker. All rights reserved.
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm mt-6">
          Author: Mostafa Rakib
        </p>
      </div>
    </footer>
  );
}

export default Footer;
