import React from "react";

import Hero from "./Hero";
import Features from "./Features";
import StatsOverview from "./StatsOverview";
import CTA from "./CTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* sections  */}
      <Hero />
      <Features />
      <StatsOverview />
      <CTA />
    </div>
  );
}
