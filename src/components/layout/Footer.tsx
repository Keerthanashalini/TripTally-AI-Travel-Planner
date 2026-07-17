import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t bg-slate-50">
      <div className="max-w-7xl mx-auto py-8 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TripTally
        </h3>

        <p className="mt-2 text-gray-600">AI Powered Smart Travel Planner</p>

        <p className="mt-3 text-sm text-gray-500">
          © 2026 TripTally. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
