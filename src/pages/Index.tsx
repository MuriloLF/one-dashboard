
import React from "react";
import PageTitle from "@/components/PageTitle";
import { dashboardTopics } from "@/data/dashboardData";
import TopicButton from "@/components/TopicButton";
import DashboardSection from "@/components/DashboardSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <PageTitle />
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Dashboard Topics</h2>
          
          {/* Main Topics Grid */}
          <DashboardSection className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardTopics.map((topic) => (
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
