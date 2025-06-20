import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-12 w-12 animate-spin rounded-full bg-gradient-to-r from-green-500 to-blue-600 p-[2px]">
        <div className="h-full w-full rounded-full bg-white"></div>
      </div>
    </div>
  );
}

export default Loader;
