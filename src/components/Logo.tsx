
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <img 
        src="/lovable-uploads/f7869ef6-476f-4ae8-b554-1d6103581758.png" 
        alt="Sami Dashboard Logo" 
        className="h-14 w-auto object-contain"
        style={{ 
          filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.1))",
          backgroundColor: "transparent"
        }}
      />
    </Link>
  );
};

export default Logo;
