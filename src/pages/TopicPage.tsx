
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import DashboardButton from "@/components/DashboardButton";  // Changed from TopicButton to DashboardButton
import { useTopics } from "@/contexts/TopicContext";
import { Button } from "@/components/ui/button";

// Helper function to remove numeric prefix - fixed to properly handle formats like "0.1. 2024"
const removeNumericPrefix = (str: string): string => {
  return str.replace(/^[\d\.]+\s*/, '');
};

const TopicPage = () => {
  const { id } = useParams<{ id: string }>();
  const { topics } = useTopics();
  
  const topic = topics.find(t => t.id === id);
  
  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            asChild
          >
            <Link to="/">
              <ChevronLeft className="w-4 h-4" /> Back to all topics
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <PageTitle />
        
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 mb-4"
              asChild
            >
              <Link to="/">
                <ChevronLeft className="w-4 h-4" /> Back to all topics
              </Link>
            </Button>
            
            <div 
              className="py-3 px-6 rounded-lg w-full text-center mb-8"
              style={{ backgroundColor: topic.color }}
            >
              <h2 className="text-2xl font-bold">{removeNumericPrefix(topic.name)}</h2>
              {topic.subtitle && <p className="text-sm">{topic.subtitle}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topic.subtopics.map((subtopic, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h3 className="text-lg font-medium mb-3 text-center">{removeNumericPrefix(subtopic.name)}</h3>
                <div className="space-y-2 w-full">
                  {subtopic.buttons.map((button, buttonIdx) => (
                    <DashboardButton
                      key={buttonIdx}
                      title={button.title}
                      subtitle={button.subtitle}
                      color={topic.color}
                      url={button.url}
                      size="sm"
                      className="w-full py-2 px-3 min-h-16"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
