
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ExternalLink, Edit } from "lucide-react";
import ColorPicker from "./ColorPicker";
import { useTopics } from "@/contexts/TopicContext";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface SubtopicWithDisplay {
  name: string;
  displayName?: string;
}

interface TopicButtonProps {
  id: string;
  title: string;
  subtitle?: string;
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  subtopics?: SubtopicWithDisplay[];
}

// Helper function to remove numeric prefix - matching the one used in TopicPage
const removeNumericPrefix = (str: string): string => {
  return str.replace(/^[\d\.]+\s*/, '');
};

const TopicButton = ({ 
  id, 
  title, 
  subtitle, 
  color, 
  size = "md",
  className,
  subtopics = []
}: TopicButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTopicColor } = useTopics();
  
  const sizeClasses = {
    sm: "py-3 px-4",
    md: "py-4 px-6",
    lg: "py-5 px-8"
  };

  const handleColorChange = (newColor: string) => {
    updateTopicColor(id, newColor);
  };

  return (
    <div className="relative group">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link 
            to={`/topic/${id}`}
            className={cn(
              "rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col justify-center items-center relative text-gray-700",
              sizeClasses[size],
              className
            )}
            style={{ backgroundColor: color }}
            onClick={(e) => {
              if (isEditing) {
                e.preventDefault();
              }
            }}
          >
            <h3 className="font-semibold text-center">{title}</h3>
            {subtitle && (
              <p className="text-sm mt-0.5 text-center opacity-85">{subtitle}</p>
            )}
            
            <ExternalLink 
              className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" 
            />
          </Link>
        </HoverCardTrigger>
        
        {subtopics.length > 0 && (
          <HoverCardContent className="p-2 bg-white shadow-lg rounded-md border">
            <div className="text-sm">
              <p className="font-medium mb-1">Subtopics:</p>
              <ul className="list-disc pl-5">
                {subtopics.map((st, index) => (
                  <li key={index} className="text-xs">{removeNumericPrefix(st.name)}</li>
                ))}
              </ul>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>

      {/* Edit button for color */}
      <button
        className="absolute top-2 left-2 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Edit size={14} />
      </button>

      {/* Color picker (appears when editing) */}
      {isEditing && (
        <div 
          className="absolute left-0 -bottom-12 z-10 p-2 bg-white rounded-md shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <ColorPicker 
            color={color} 
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default TopicButton;
