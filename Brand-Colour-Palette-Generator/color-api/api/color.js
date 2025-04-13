const fetch = require("node-fetch");

let colorData = [];
const colorIndexMap = {};

async function loadColorData() {
  if (colorData.length > 0) return; // Already loaded
  const url = "https://cdn.jsdelivr.net/gh/EsotericShadow/Brand-Colour-Palette-Generator@main/color_data.json";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to load color data");
  colorData = await response.json();
}

function getColor(industry, voice, tone) {
  const key = `${industry.toLowerCase()}-${voice.toLowerCase()}-${tone.toLowerCase()}`;
  
  console.log(`Looking for match: industry=${industry.toLowerCase()}, voice=${voice.toLowerCase()}, tone=${tone.toLowerCase()}`); // Debugging log
  
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
  const { industry, voice, tone } = req.query;

  if (!industry || !voice || !tone) {
    return res.status(400).json({ error: "Missing required parameters: industry, voice, tone" });
  }

  try {
    await loadColorData();
    console.log("Loaded color data:", colorData);  // Debugging log

    const result = getColor(industry, voice, tone);
    if (result.error) {
      console.log("No matching color found.");
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
