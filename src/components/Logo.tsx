
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <img 
        src="/lovable-uploads/4a186043-13b9-4389-933d-ed8c26056f19.png" 
        alt="Sami Dashboard Logo" 
        className="h-14 w-auto object-contain"
        style={{ 
          backgroundColor: "transparent"
        }}
      />
    </Link>
  );
};

export default Logo;
