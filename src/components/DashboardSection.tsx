
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardSectionProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardSection = ({ children, className }: DashboardSectionProps) => {
  return (
    <div className={cn("grid gap-3 mb-6", className)}>
      {children}
    </div>
  );
};

export default DashboardSection;
