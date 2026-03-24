const form = document.getElementById("quakeForm");
const resultsDiv = document.getElementById("results");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const magnitude = document.getElementById("magnitude").value;

  // ✔️ JS validation
  if (!startDate || !endDate || magnitude < 0) {
    message.textContent = "Please enter valid search values.";
    message.className = "error";
    return;
  }

  message.textContent = "Loading...";
  message.className = "";

  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=${magnitude}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch earthquake data.");
    }

    const data = await response.json();
    displayQuakes(data.features);

    message.textContent = `Found ${data.features.length} earthquakes.`;
    message.className = "success";

  } catch (error) {
    message.textContent = error.message;
    message.className = "error";
  }
});

function displayQuakes(quakes) {
  resultsDiv.innerHTML = "";

  if (quakes.length === 0) {
    resultsDiv.textContent = "No earthquakes found.";
    return;
  }

  quakes.forEach(q => {
    const place = q.properties.place;
    const mag = q.properties.mag;
    const time = new Date(q.properties.time).toLocaleString();

    const div = document.createElement("div");
    div.classList.add("quake");

    div.innerHTML = `
      <strong>Location:</strong> ${place}<br>
      <strong>Magnitude:</strong> ${mag}<br>
      <strong>Date:</strong> ${time}
    `;

    resultsDiv.appendChild(div);
  });
}
