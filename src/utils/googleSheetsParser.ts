
import { Topic, Subtopic, SubtopicButton } from "@/data/dashboardData";

const SHEET_ID = "109mhmt8MMonS0dF0aKAB0SeY9ETTRzvim5ChhW3Zbak";
const SHEET_NAME = "Sheet1"; // Update this if your sheet has a different name
const API_KEY = "AIzaSyBL-BxkMD7iG8_MZBbgFJF3S1X9mFGtUvM"; // This is a read-only API key for Google Sheets

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
    // Fetch the data from Google Sheets API
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values;

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
