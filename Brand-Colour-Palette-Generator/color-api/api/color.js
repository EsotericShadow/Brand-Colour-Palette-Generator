const fs = require("fs").promises;
const path = require("path");

let colorData = [];
const colorIndexMap = {};

async function loadColorData() {
  if (colorData.length > 0) return; // Prevent reloading
  const filePath = path.join(__dirname, "../data/color-data.json");
  const rawData = await fs.readFile(filePath, "utf8");
  colorData = JSON.parse(rawData);
}

function getColor(industry, voice, tone) {
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

module.exports = async (req, res) => {
  const { industry, voice, tone } = req.query;

  await loadColorData();

  if (!industry || !voice || !tone) {
    return res.status(400).json({ error: "Missing required parameters: industry, voice, tone" });
  }

  const result = getColor(industry, voice, tone);

  if (result.error) {
    return res.status(404).json({ error: result.error });
  }

  return res.status(200).json(result);
};
