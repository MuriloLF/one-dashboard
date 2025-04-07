
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import DashboardSection from "@/components/DashboardSection";
import DashboardButton from "@/components/DashboardButton";
import { dashboardTopics, Topic } from "@/data/dashboardData";

const TopicPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const topic = dashboardTopics.find(t => t.id === id);
  
  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
          <Link to="/" className="flex items-center justify-center gap-2 text-blue-600 hover:underline">
            <ChevronLeft className="w-4 h-4" /> Back to all topics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <PageTitle />
        
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
          <div className="mb-8 flex items-center">
            <Link to="/" className="flex items-center gap-2 text-blue-600 hover:underline mr-4">
              <ChevronLeft className="w-4 h-4" /> Back
            </Link>
            <div 
              className="py-2 px-6 rounded-lg"
              style={{ backgroundColor: topic.color }}
            >
              <h2 className="text-xl font-bold">{topic.name}</h2>
              {topic.subtitle && <p className="text-sm">{topic.subtitle}</p>}
            </div>
          </div>

          {/* Header for this topic */}
          <DashboardSection>
            <DashboardButton
              title={topic.name}
              subtitle={topic.subtitle}
              color={topic.color}
              url="#"
              size="lg"
              className="w-full"
            />
          </DashboardSection>
          
          {/* Subtopics Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {topic.subtopics.map((subtopic, idx) => (
              <div key={idx} className={subtopic.buttons.length > 2 ? "col-span-1 md:col-span-1" : "col-span-1"}>
                <h3 className="text-lg font-medium mb-3 px-1">{subtopic.name}</h3>
                <div className="space-y-3">
                  {subtopic.buttons.map((button, buttonIdx) => (
                    <DashboardButton
                      key={buttonIdx}
                      title={button.title}
                      subtitle={button.subtitle}
                      color={topic.color}
                      url={button.url}
                      size="sm"
                      className="w-full"
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
