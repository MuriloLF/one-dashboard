
import { Topic, Subtopic, SubtopicButton } from "@/data/dashboardData";

// Using a public Google Sheets URL approach instead of API key
// This is more reliable for public sheets that don't require authentication
const SHEET_ID = "109mhmt8MMonS0dF0aKAB0SeY9ETTRzvim5ChhW3Zbak";
const SHEET_NAME = "Sheet1"; // Update this if your sheet has a different name

// Helper function to extract number from a string like "1. Something"
const extractNumber = (str: string): number => {
  const match = str.match(/^(\d+)[\.\s]/);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
};

interface SheetRow {
  [key: string]: string;
}

export const fetchGoogleSheetsData = async (): Promise<Topic[]> => {
  try {
    // Using the public CSV export URL which doesn't require an API key
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    
    // Parse CSV data
    const rows = parseCSV(csvText);
    
    if (!rows || rows.length <= 1) {
      throw new Error("No data found in the sheet");
    }

    // Skip the header row
    const dataRows = rows.slice(1);

    // Group by topics
    const topicMap = new Map<string, Map<string, SubtopicButton[]>>();

    dataRows.forEach((row: string[]) => {
      const dashboardTitle = row[0];
      const link = row[1];
      const topicName = row[2];
      const subtopicName = row[3];

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

    // Save the fetched data to localStorage for future reference
    try {
      localStorage.setItem("lastGoogleSheetsImport", JSON.stringify(rows));
    } catch (e) {
      console.error("Failed to save Google Sheets data to localStorage:", e);
    }

    return topics;
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    throw error;
  }
};

// Simple CSV parser function
function parseCSV(text: string): string[][] {
  const lines = text.split('\n');
  return lines.map(line => {
    // Handle quoted values (which may contain commas)
    const result: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    // Don't forget the last value
    result.push(currentValue);
    
    // Clean up quotes from values
    return result.map(value => value.replace(/^"|"$/g, ''));
  });
}
