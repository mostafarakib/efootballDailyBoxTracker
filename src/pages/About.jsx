import {
  ChevronRight,
  Github,
  Heart,
  Mail,
  Shield,
  Target,
  Trophy,
  Twitter,
  Zap,
} from "lucide-react";
import React from "react";

function About() {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-400" />,
      title: "Precision",
      description:
        "Every stat, every match, every moment tracked with surgical precision",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Performance",
      description: "Lightning-fast insights that help you improve in real-time",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Privacy",
      description:
        "Your data is secure and protected with enterprise-grade security",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-400" />,
      title: "Passion",
      description: "Built by gamers, for gamers who live and breathe eFootball",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "The Vision",
      description:
        "Started as a personal project to track eFootball matches and statistics",
    },
    {
      year: "2024",
      title: "Community Growth",
      description:
        "Expanded to serve thousands of players worldwide with advanced analytics",
    },
    {
      year: "2025",
      title: "Innovation",
      description:
        "Launching AI-powered insights and predictive match analysis",
    },
  ];

  const team = [
    {
      name: "Mostafa Rakib",
      role: "Founder & Lead Developer",
      description:
        "Former pro gamer turned developer, passionate about creating tools that help players excel.",
    },
    {
      name: "Sarah",
      role: "UI/UX Designer",
      description:
        "Award-winning designer focused on creating intuitive experiences for gamers.",
    },
    {
      name: "Towhidul Islam",
      role: "Data Scientist & Chief Strategiest",
      description:
        "Sports analytics expert who transforms raw match data into actionable insights.",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 flex items-center min-h-screen overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              About
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Our Story
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              We're passionate gamers and developers who believe every eFootball
              player deserves the tools to reach their full potential. Our
              mission is simple: make you a better player.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Every great player started with a dream and the dedication to
                improve. We created eFootball Tracker because we understand the
                frustration of not knowing where you stand or how to get better.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Our platform transforms raw match data into actionable insights,
                helping you identify strengths, overcome weaknesses, and track
                your journey from amateur to pro.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    10,000+ Players Improved
                  </div>
                  <div className="text-gray-400">Since our launch</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-green-500/20 to-blue-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      500K+
                    </div>
                    <div className="text-gray-400">Matches Analyzed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      85%
                    </div>
                    <div className="text-gray-400">Skill Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      24/7
                    </div>
                    <div className="text-gray-400">Real-time Tracking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      99.9%
                    </div>
                    <div className="text-gray-400">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 text-center"
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Journey
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From concept to community - here's how we've grown
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-2xl font-bold text-white mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-4 border-slate-900"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The passionate individuals behind eFootball Tracker
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-green-400 font-medium mb-4">
                  {member.role}
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {member.description}
                </p>
                <div className="flex justify-center space-x-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                  <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/20 to-blue-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a growing community of passionate eFootball players who
            are serious about improving their game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Start Your Journey
              <ChevronRight className="inline-block ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
