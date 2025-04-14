const fetch = require("node-fetch");

let colorData = [];
const colorIndexMap = {};

async function loadColorData() {
  if (colorData.length > 0) return; // Already loaded
  const url = "https://cdn.jsdelivr.net/gh/EsotericShadow/Brand-Colour-Palette-Generator@main/Brand-Colour-Palette-Generator/color-api/api/good_color_data.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    const text = await response.text(); // Get raw text for debugging
    try {
      colorData = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);
      console.error("Raw response text:", text.slice(0, 500)); // Log first 500 chars
      throw new Error("Invalid JSON response from color data URL");
    }
  } catch (error) {
    console.error("Fetch Error:", error.message);
    throw error;
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
