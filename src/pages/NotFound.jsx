import { Button } from "@/components";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="grid min-h-dvh bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-6xl font-semibold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-200 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link className="inline-block mt-4" to="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
