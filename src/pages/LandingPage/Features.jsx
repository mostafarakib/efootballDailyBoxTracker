import { TrendingUp, Trophy, Users } from "lucide-react";
import React from "react";

function Features() {
  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      title: "Track Every Match",
      description:
        "Monitor all your eFootball matches, goals, and achievements in one place",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Performance Analytics",
      description:
        "Get detailed insights into your gameplay with advanced statistics and trends",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Community Features",
      description:
        "Connect with other players, share achievements, and compare your progress",
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive tools and insights to help you become a better
            eFootball player
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
