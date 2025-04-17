
import { Topic, Subtopic, SubtopicButton } from "@/data/dashboardData";

// Using a public Google Sheets URL approach instead of API key
const SHEET_ID = "109mhmt8MMonS0dF0aKAB0SeY9ETTRzvim5ChhW3Zbak";
const DATA_SHEET = "Sheet1";
const DESIGN_SHEET = "Dados Topicos";

// Helper function to extract number from a string
const extractNumber = (str: string): number => {
  const match = str.match(/^(\d+)[\.\s]/);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
};

interface TopicDesign {
  name: string;
  description: string;
  backgroundColor: string;
  textColor: string;
}

// Define a color mapping based on the Google Sheet colors
const colorMapping: Record<string, { bg: string, text: string }> = {
  "Texto": { bg: "#69f0ae", text: "#000000" }, // Default green
  "7. Parceiros": { bg: "#ff7373", text: "#000000" }, // Red
  "1. Panorama Estratégico": { bg: "#64b5f6", text: "#000000" }, // Blue
  "5. Procedimento": { bg: "#ffab91", text: "#000000" }, // Orange
  "Lixeira": { bg: "#e0e0e0", text: "#000000" }, // Gray
  "2. TdS": { bg: "#80deea", text: "#000000" }, // Teal 
  "3. Sinistro": { bg: "#fff176", text: "#000000" }, // Yellow
  "0. OKR": { bg: "#ff8a80", text: "#000000" }, // Light Red
  "4. Porfolio": { bg: "#ce93d8", text: "#000000" }, // Purple
  "6. Regulação": { bg: "#a5d6a7", text: "#000000" }, // Light Green
  "8. Externos": { bg: "#90caf9", text: "#000000" } // Light Blue
};

async function fetchTopicDesigns(): Promise<TopicDesign[]> {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${DESIGN_SHEET}&headers=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch topic designs');
    }

    const text = await response.text();
    // Extract the JSON part from the response
    const json = JSON.parse(text.substr(text.indexOf('{'), text.lastIndexOf('}') - text.indexOf('{') + 1));
    
    if (!json.table || !json.table.rows) {
      console.error('Invalid response format from Google Sheets:', json);
      return [];
    }
    
    // Parse the rows into our format
    const designs: TopicDesign[] = json.table.rows.map((row: any) => {
      const topicName = row.c[0]?.v || '';
      const colorData = colorMapping[topicName] || colorMapping["Texto"]; // Use default if not found
      
      return {
        name: topicName,
        description: row.c[1]?.v || '',
        backgroundColor: colorData.bg,
        textColor: colorData.text
      };
    });

    return designs;
  } catch (error) {
    console.error('Error fetching topic designs:', error);
    return [];
  }
}

export const fetchGoogleSheetsData = async (): Promise<Topic[]> => {
  try {
    // Fetch both data and designs
    const [dataResponse, designs] = await Promise.all([
      fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${DATA_SHEET}`),
      fetchTopicDesigns()
    ]);

    if (!dataResponse.ok) {
      throw new Error(`Failed to fetch data: ${dataResponse.status}`);
    }

    const csvText = await dataResponse.text();
    const rows = parseCSV(csvText);
    
    if (!rows || rows.length <= 1) {
      throw new Error("No data found in the sheet");
    }

    // Skip header row and process data
    const dataRows = rows.slice(1);
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

    // Convert maps to topic array with design information
    const topics: Topic[] = [];

    topicMap.forEach((subtopicMap, topicName) => {
      const topicId = topicName.toLowerCase().replace(/\s+/g, "-");
      
      // Find the matching design by exact topic name
      const design = designs.find(d => d.name === topicName);
      
      // Get color information from our color mapping
      const colorData = design ? 
                      { backgroundColor: design.backgroundColor, textColor: design.textColor } : 
                      { backgroundColor: colorMapping["Texto"].bg, textColor: colorMapping["Texto"].text };
      
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
        color: colorData.backgroundColor,
        textColor: colorData.textColor,
        subtopics,
      });
    });

    // Save to localStorage
    try {
      localStorage.setItem("lastGoogleSheetsImport", JSON.stringify(rows));
      localStorage.setItem("topicDesigns", JSON.stringify(designs));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }

    console.log("Processed topics with colors:", topics);
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
