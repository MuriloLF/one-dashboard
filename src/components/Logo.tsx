
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold text-red-500">sami</span>
        <span className="text-xl ml-1 text-gray-600">One Dashboard</span>
      </div>
    </Link>
  );
};

export default Logo;
