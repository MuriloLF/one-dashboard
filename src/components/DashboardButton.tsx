
import React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

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
    sm: "py-2 px-3",
    md: "py-3 px-5",
    lg: "py-4 px-7"
  };

  // Function to ensure URL has proper format
  const formatUrl = (url: string): string => {
    if (!url || url === "#") return "#";
    
    // Check if the URL already has a protocol
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Add https:// as default protocol if needed
    return `https://${url}`;
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a 
          href={formatUrl(url)} 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col justify-center items-center relative group text-gray-700",
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
      </HoverCardTrigger>
      
      {subtitle && (
        <HoverCardContent className="p-2 bg-white shadow-lg rounded-md border">
          <div className="text-sm">
            <p>{subtitle}</p>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default DashboardButton;
