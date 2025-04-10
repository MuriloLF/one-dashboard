
import React, { createContext, useState, useContext, useEffect } from "react";
import { dashboardTopics, Topic } from "@/data/dashboardData";
import { fetchGoogleSheetsData } from "@/utils/googleSheetsParser";
import { toast } from "sonner";

interface TopicContextType {
  topics: Topic[];
  updateTopicColor: (id: string, color: string) => void;
  updateTopics: (newTopics: Topic[]) => void;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const TopicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>(dashboardTopics);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadDataFromGoogleSheets = async () => {
    setIsLoading(true);
    try {
      const sheetsData = await fetchGoogleSheetsData();
      
      if (sheetsData.length === 0) {
        toast.error("No data found in Google Sheet");
        return;
      }
      
      // Merge with any existing colors
      const updatedTopics = sheetsData.map(newTopic => {
        const existingTopic = topics.find(t => 
          t.id === newTopic.id || 
          t.name === newTopic.name
        );
        
        return existingTopic 
          ? { ...newTopic, color: existingTopic.color } 
          : newTopic;
      });
      
      setTopics(updatedTopics);
      localStorage.setItem("dashboardTopics", JSON.stringify(updatedTopics));
      toast.success("Dashboard data updated from Google Sheets");
      console.log("Google Sheets data loaded successfully:", updatedTopics);
    } catch (error) {
      console.error("Failed to load data from Google Sheets:", error);
      toast.error("Failed to load data from Google Sheets. Using saved data instead.");
      
      // Fall back to localStorage if available
      const savedTopics = localStorage.getItem("dashboardTopics");
      if (savedTopics) {
        try {
          const parsedTopics = JSON.parse(savedTopics);
          if (parsedTopics.length > 0) {
            setTopics(parsedTopics);
            toast.info("Using previously saved dashboard data");
          }
        } catch (e) {
          console.error("Failed to parse saved topics:", e);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load topics on mount
  useEffect(() => {
    const savedTopics = localStorage.getItem("dashboardTopics");
    if (savedTopics) {
      try {
        const parsedTopics = JSON.parse(savedTopics);
        // Ensure no duplication on first load
        if (parsedTopics.length > 0) {
          setTopics(parsedTopics);
        }
      } catch (e) {
        console.error("Failed to parse saved topics:", e);
      }
    }
    
    // Fetch from Google Sheets
    loadDataFromGoogleSheets();
  }, []);

  // Save topics to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dashboardTopics", JSON.stringify(topics));
  }, [topics]);

  const updateTopicColor = (id: string, color: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id ? { ...topic, color } : topic
      )
    );
  };

  const updateTopics = (newTopics: Topic[]) => {
    setTopics((prevTopics) => {
      // Preserve existing colors when updating topics
      const updatedTopics = newTopics.map(newTopic => {
        const existingTopic = prevTopics.find(t => 
          t.id === newTopic.id || 
          t.name === newTopic.name
        );
        
        return existingTopic 
          ? { ...newTopic, color: existingTopic.color } 
          : newTopic;
      });
      
      return updatedTopics;
    });
  };

  const refreshData = async () => {
    await loadDataFromGoogleSheets();
  };

  return (
    <TopicContext.Provider value={{ 
      topics, 
      updateTopicColor, 
      updateTopics, 
      isLoading,
      refreshData 
    }}>
      {children}
    </TopicContext.Provider>
  );
};

export const useTopics = () => {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error("useTopics must be used within a TopicProvider");
  }
  return context;
};
