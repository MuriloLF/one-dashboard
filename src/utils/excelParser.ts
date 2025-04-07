
import { Topic, Subtopic, SubtopicButton } from "@/data/dashboardData";
import * as XLSX from "xlsx";

interface ExcelRow {
  A: string; // Dashboard Title
  B: string; // Link
  C: string; // Topic
  D: string; // Subtopic
}

// Helper function to extract number from a string like "1. Something"
const extractNumber = (str: string): number => {
  const match = str.match(/^(\d+)[\.\s]/);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
};

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
          
          // Sort the subtopics by numbering system
          const sortedSubtopicEntries = Array.from(subtopicMap.entries())
            .sort(([keyA], [keyB]) => {
              const numA = extractNumber(keyA);
              const numB = extractNumber(keyB);
              
              if (numA !== numB) {
                return numA - numB;
              }
              
              return keyA.localeCompare(keyB);
            });
          
          sortedSubtopicEntries.forEach(([subtopicName, buttons]) => {
            // Sort buttons within each subtopic
            const sortedButtons = [...buttons].sort((a, b) => {
              const numA = extractNumber(a.title);
              const numB = extractNumber(b.title);
              
              if (numA !== numB) {
                return numA - numB;
              }
              
              return a.title.localeCompare(b.title);
            });
            
            subtopics.push({
              name: subtopicName,
              buttons: sortedButtons,
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
        
        // Save the raw Excel data to localStorage for future reference
        try {
          localStorage.setItem("lastExcelImport", JSON.stringify(rows));
        } catch (e) {
          console.error("Failed to save Excel data to localStorage:", e);
        }
        
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
