
import React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface DashboardButtonProps {
  title: string;
  subtitle?: string;
  color: string;
  url: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const DashboardButton = ({ 
  title, 
  subtitle, 
  color, 
  url, 
  size = "md",
  className 
}: DashboardButtonProps) => {
  const sizeClasses = {
    sm: "py-3 px-4",
    md: "py-4 px-6",
    lg: "py-5 px-8"
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col justify-center items-center relative group",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: color }}
    >
      <h3 className="font-semibold text-center">{title}</h3>
      {subtitle && (
        <p className="text-sm mt-0.5 text-center opacity-85">{subtitle}</p>
      )}
      <ExternalLink 
        className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" 
      />
    </a>
  );
};

export default DashboardButton;
