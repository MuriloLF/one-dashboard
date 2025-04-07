
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <img 
        src="/lovable-uploads/4a6fa383-15c1-46d4-a7d6-36bf40b81a37.png" 
        alt="Sami Logo" 
        className="h-12 w-auto"
      />
    </Link>
  );
};

export default Logo;
