
import React from "react";
import PageTitle from "@/components/PageTitle";
import TopicButton from "@/components/TopicButton";
import DashboardSection from "@/components/DashboardSection";
import { useTopics } from "@/contexts/TopicContext";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

// Helper function to extract number from string like "1. Topic"
const extractNumber = (str: string): number => {
  const match = str.match(/^(\d+)[\.\s]/);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
};

// Helper function to remove numeric prefix
const removeNumericPrefix = (str: string): string => {
  return str.replace(/^[\d\.]+\s*/, '');
};

const Index = () => {
  const { topics, refreshData, isLoading } = useTopics();

  // Sort topics based on numbering system
  const sortedTopics = [...topics].sort((a, b) => {
    const numA = extractNumber(a.name);
    const numB = extractNumber(b.name);
    
    if (numA !== numB) {
      return numA - numB;
    }
    
    // If numbers are the same or not present, sort alphabetically
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <PageTitle />
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dashboard Topics</h2>
            <Button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Updating...' : 'Refresh Data'}
            </Button>
          </div>
          
          {/* Main Topics Grid */}
          <DashboardSection className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTopics.map((topic) => (
              <TopicButton
                key={topic.id}
                id={topic.id}
                title={removeNumericPrefix(topic.name)}
                subtitle={topic.subtitle}
                color={topic.color}
                className="w-full h-auto min-h-20 py-3"
                subtopics={topic.subtopics}
              />
            ))}
          </DashboardSection>
        </div>
      </div>
    </div>
  );
};

export default Index;
