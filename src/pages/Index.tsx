
import React from "react";
import PageTitle from "@/components/PageTitle";
import TopicButton from "@/components/TopicButton";
import DashboardSection from "@/components/DashboardSection";
import { useTopics } from "@/contexts/TopicContext";
import ExcelImport from "@/components/ExcelImport";

const Index = () => {
  const { topics } = useTopics();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <PageTitle />
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dashboard Topics</h2>
            <ExcelImport />
          </div>
          
          {/* Main Topics Grid */}
          <DashboardSection className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <TopicButton
                key={topic.id}
                id={topic.id}
                title={topic.name}
                subtitle={topic.subtitle}
                color={topic.color}
                className="w-full h-24"
              />
            ))}
          </DashboardSection>
        </div>
      </div>
    </div>
  );
};

export default Index;
