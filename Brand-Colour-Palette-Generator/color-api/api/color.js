const fs = require("fs");
const path = require("path");

let colorData = [];
const colorIndexMap = {};

async function loadColorData() {
  if (colorData.length > 0) return; // Already loaded

  const filePath = path.join(__dirname, "good_color_data.json");
  try {
    const fileContents = await fs.promises.readFile(filePath, "utf-8");
    colorData = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load local color data:", error.message);
    throw new Error("Failed to load local color data.");
  }
}

function getColor(industry, voice, tone) {
  const key = `${industry.toLowerCase()}-${voice.toLowerCase()}-${tone.toLowerCase()}`;

  console.log(`Looking for match: industry=${industry.toLowerCase()}, voice=${voice.toLowerCase()}, tone=${tone.toLowerCase()}`);

  const match = colorData.find(
    (entry) =>
      entry.industry.toLowerCase() === industry.toLowerCase() &&
      entry.voice.toLowerCase() === voice.toLowerCase() &&
      entry.tone.toLowerCase() === tone.toLowerCase()
  );

  if (match && match.colors.length > 0) {
    const currentIndex = colorIndexMap[key] || 0;
    const color = match.colors[currentIndex];
    colorIndexMap[key] = (currentIndex + 1) % match.colors.length;
    return color;
  } else {
    return { error: "No matching color found." };
  }
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { industry, voice, tone } = req.query;

  if (!industry || !voice || !tone) {
    return res.status(400).json({ error: "Missing required parameters: industry, voice, tone" });
  }

  try {
    await loadColorData();
    console.log(`Color data loaded, entries: ${colorData.length}`);

    const result = getColor(industry, voice, tone);
    if (result.error) {
      console.log("No matching color found for:", { industry, voice, tone });
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};
