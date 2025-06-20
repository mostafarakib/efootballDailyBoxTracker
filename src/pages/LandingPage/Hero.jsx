import { ChevronRight, TrendingUp, Trophy } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative pt-20 pb-32 flex items-center min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Track Your
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              eFootball
            </span>
            <br />
            Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate companion for eFootball players. Monitor your matches,
            analyze your performance, and climb the ranks with detailed insights
            and statistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              to={"/gameBoxTracker"}
            >
              Get Started
              <ChevronRight className="inline-block ml-2 w-5 h-5" />
            </Link>

            <button className="border-2 border-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Floating cards animation */}
      <div className="hidden md:block absolute top-1/4 left-10 animate-bounce animation-delay-1000">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
          <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
          <div className="text-sm">Latest Win</div>
          <div className="font-bold">3-1 Victory</div>
        </div>
      </div>

      <div className="hidden md:block absolute top-1/3 right-10 animate-bounce animation-delay-3000">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
          <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
          <div className="text-sm">Win Rate</div>
          <div className="font-bold">78%</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
