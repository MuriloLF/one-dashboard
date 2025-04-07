
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <img 
        src="/lovable-uploads/48f41b3f-861a-48d2-ae07-973e0a926a1c.png" 
        alt="Sami Logo" 
        className="h-10 w-auto"
      />
    </Link>
  );
};

export default Logo;
