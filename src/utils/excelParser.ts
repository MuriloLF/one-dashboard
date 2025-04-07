
import { Topic, Subtopic, SubtopicButton } from "@/data/dashboardData";
import * as XLSX from "xlsx";

interface ExcelRow {
  A: string; // Dashboard Title
  B: string; // Link
  C: string; // Topic
  D: string; // Subtopic
}

export const parseExcelFile = async (file: File): Promise<Topic[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert Excel data to JSON, starting from row 2 (skipping headers)
        const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { header: "A" });
        
        // Skip the header row
        const rows = jsonData.slice(1);
        
        // Group by topics
        const topicMap = new Map<string, Map<string, SubtopicButton[]>>();
        
        rows.forEach((row) => {
          const dashboardTitle = row.A;
          const link = row.B;
          const topicName = row.C;
          const subtopicName = row.D;
          
          if (!topicName || !subtopicName || !dashboardTitle) return;
          
          // Get or create topic map
          if (!topicMap.has(topicName)) {
            topicMap.set(topicName, new Map<string, SubtopicButton[]>());
          }
          
          const subtopicMap = topicMap.get(topicName)!;
          
          // Get or create subtopic array
          if (!subtopicMap.has(subtopicName)) {
            subtopicMap.set(subtopicName, []);
          }
          
          // Add button to subtopic
          subtopicMap.get(subtopicName)!.push({
            title: dashboardTitle,
            url: link || "#",
          });
        });
        
        // Convert maps to topic array
        const topics: Topic[] = [];
        
        topicMap.forEach((subtopicMap, topicName) => {
          const topicId = topicName.toLowerCase().replace(/\s+/g, "-");
          
          const subtopics: Subtopic[] = [];
          subtopicMap.forEach((buttons, subtopicName) => {
            subtopics.push({
              name: subtopicName,
              buttons,
            });
          });
          
          topics.push({
            id: topicId,
            name: topicName,
            // Preserve existing colors if possible
            color: "#69f0ae", // Default color
            subtopics,
          });
        });
        
        resolve(topics);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsBinaryString(file);
  });
};
