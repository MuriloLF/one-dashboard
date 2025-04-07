
import React, { createContext, useState, useContext, useEffect } from "react";
import { dashboardTopics, Topic } from "@/data/dashboardData";

interface TopicContextType {
  topics: Topic[];
  updateTopicColor: (id: string, color: string) => void;
  updateTopics: (newTopics: Topic[]) => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const TopicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>(dashboardTopics);

  // Load topics from localStorage on mount
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

  return (
    <TopicContext.Provider value={{ topics, updateTopicColor, updateTopics }}>
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
