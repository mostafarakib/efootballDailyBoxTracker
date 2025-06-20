import { Button } from "@/components";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-500/20 to-blue-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Level Up Your Game?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of players who are already tracking their progress and
          improving their skills.
        </p>
        <Link to="/gameBoxTracker">
          <Button>
            Start Tracking Now
            <ChevronRight className="inline-block ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default CTA;
