let colorData = [];
const colorIndexMap = {};

fetch("color-data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    colorData = data;
    console.log("Data loaded:", colorData); // Debug
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    document.getElementById("color-output").innerHTML =
      "<p>Error loading color data.</p>";
  });

function getColor(industry, voice, tone) {
  if (!colorData.length) {
    displayNoMatch("Color data not loaded yet.");
    return;
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
    displayColor(color);
  } else {
    displayNoMatch();
  }
}

function displayColor(color) {
  const output = document.getElementById("color-output");
  output.innerHTML = `
    <div class="color-box" style="background-color: ${color.hex};"></div>
    <strong>${color.name}</strong><br>
    <em>${color.description}</em><br>
    HEX: ${color.hex}<br>
    RGB: ${color.rgb}<br>
    HSL: ${color.hsl}<br>
    CMYK: ${color.cmyk}
  `;
}

function displayNoMatch(message = "No matching color found.") {
  document.getElementById("color-output").innerHTML = `<p>${message}</p>`;
}

document.getElementById("generate-color").addEventListener("click", () => {
  const industry = document.getElementById("industry").value;
  const voice = document.getElementById("voice").value;
  const tone = document.getElementById("tone").value;
  getColor(industry, voice, tone);
});
