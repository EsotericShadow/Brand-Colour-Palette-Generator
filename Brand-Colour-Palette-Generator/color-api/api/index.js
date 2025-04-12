const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();

let colorData = [];
const colorIndexMap = {};

async function loadColorData() {
  try {
    const filePath = path.join(__dirname, "../data/color-data.json");
    const rawData = await fs.readFile(filePath, "utf8");
    colorData = JSON.parse(rawData);
    console.log("Data loaded:", colorData); // Debug
  } catch (error) {
    console.error("Fetch error:", error);
    // No DOM, so log error (client will handle display)
  }
}

loadColorData();

function getColor(industry, voice, tone) {
  if (!colorData.length) {
    return { error: "Color data not loaded yet." };
  }
  const key = `${industry}-${voice}-${tone}`;
  const match = colorData.find(
    (entry) =>
      entry.industry === industry &&
      entry.voice === voice &&
      entry.tone === tone
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

app.get("/api/color", async (req, res) => {
  const { industry, voice, tone } = req.query;

  if (!industry || !voice || !tone) {
    return res.status(400).json({ error: "Missing required parameters: industry, voice, tone" });
  }

  const result = getColor(industry, voice, tone);

  if (result.error) {
    return res.status(404).json({ error: result.error });
  }

  return res.json(result);
});

// Vercel handler
module.exports = app;
