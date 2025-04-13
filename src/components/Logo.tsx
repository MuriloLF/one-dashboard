
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <img 
        src="/lovable-uploads/3befe50c-393f-4a4e-a30a-323116d05e4e.png" 
        alt="Sami Dashboard Logo" 
        className="h-56 w-auto object-contain"
        style={{ 
          backgroundColor: "transparent"
        }}
      />
    </Link>
  );
};

export default Logo;
