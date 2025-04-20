
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface SubtopicWithDisplay {
  name: string;
  displayName?: string;
}

interface TopicButtonProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  color: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  subtopics?: SubtopicWithDisplay[];
}

const removeNumericPrefix = (str: string): string => {
  return str.replace(/^[\d\.]+\s*/, '');
};

const TopicButton = ({ 
  id, 
  title, 
  subtitle,
  description,
  color, 
  textColor = '#000000',
  size = "md",
  className,
  subtopics = []
}: TopicButtonProps) => {
  const sizeClasses = {
    sm: "py-3 px-4",
    md: "py-4 px-6",
    lg: "py-5 px-8"
  };

  return (
    <div className="relative group">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link 
            to={`/topic/${id}`}
            className={cn(
              "rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col justify-center items-center relative",
              sizeClasses[size],
              className
            )}
            style={{ 
              backgroundColor: color,
              color: textColor,
              transition: "background-color 0.2s ease" 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${color} 85%, black)`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = color;
            }}
          >
            <h3 className="font-semibold text-center">{title}</h3>
            {subtitle && (
              <p className="text-sm mt-0.5 text-center opacity-85">{subtitle}</p>
            )}
            
            <ExternalLink 
              className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" 
              style={{ color: textColor }}
            />
          </Link>
        </HoverCardTrigger>
        
        <HoverCardContent 
          className="p-4 bg-white shadow-lg rounded-md border w-80 space-y-4"
          style={{ color: '#000000' }}
        >
          {description && (
            <div className="text-sm">
              <p className="font-medium mb-2">About this topic:</p>
              <p>{description}</p>
            </div>
          )}
          
          {subtopics.length > 0 && (
            <div className="text-sm">
              <p className="font-medium mb-1">Subtopics:</p>
              <ul className="list-disc pl-5">
                {subtopics.map((st, index) => (
                  <li key={index} className="text-xs">{removeNumericPrefix(st.name)}</li>
                ))}
              </ul>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default TopicButton;
