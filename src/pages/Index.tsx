
import React from "react";
import PageTitle from "@/components/PageTitle";
import DashboardLayout from "@/components/DashboardLayout";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <PageTitle />
        <DashboardLayout />
      </div>
    </div>
  );
};

export default Index;
