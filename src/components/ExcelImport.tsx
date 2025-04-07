
import React, { useState } from "react";
import { Button } from "./ui/button";
import { parseExcelFile } from "@/utils/excelParser";
import { useTopics } from "@/contexts/TopicContext";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExcelImport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateTopics, topics: currentTopics } = useTopics();
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const newTopics = await parseExcelFile(file);
      
      // Preserve existing colors
      const updatedTopics = newTopics.map(newTopic => {
        const existingTopic = currentTopics.find(t => t.id === newTopic.id || t.name === newTopic.name);
        return existingTopic ? { ...newTopic, color: existingTopic.color } : newTopic;
      });
      
      updateTopics(updatedTopics);
      
      toast({
        title: "Success!",
        description: `Imported ${newTopics.length} topics from ${file.name}`,
      });
    } catch (error) {
      console.error("Error parsing Excel file:", error);
      toast({
        title: "Error parsing file",
        description: "There was a problem processing the Excel file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // Reset the input
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        id="excel-import"
        accept=".xlsx, .xls"
        className="hidden"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <label htmlFor="excel-import">
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={isLoading}
          asChild
        >
          <span>
            <Upload className="mr-2 h-4 w-4" />
            {isLoading ? "Importing..." : "Import Excel Data"}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default ExcelImport;
