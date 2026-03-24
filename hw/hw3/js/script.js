const form = document.getElementById("quakeForm");
const resultsDiv = document.getElementById("results");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const magnitude = document.getElementById("magnitude").value;

  resultsDiv.innerHTML = "";

  if (!startDate || !endDate || magnitude === "") {
    message.textContent = "Please fill out all fields.";
    message.className = "error";
    return;
  }

  if (endDate < startDate) {
    message.textContent = "End date cannot be before start date.";
    message.className = "error";
    return;
  }

  if (Number(magnitude) < 0) {
    message.textContent = "Magnitude cannot be negative.";
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

    if (!data.features || data.features.length === 0) {
      message.textContent = "No earthquakes found for that search.";
      message.className = "error";
      return;
    }

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

  quakes.forEach((q) => {
    const place = q.properties.place;
    const mag = q.properties.mag;
    const time = new Date(q.properties.time).toLocaleString();

    const div = document.createElement("div");
    div.classList.add("quake");

    div.innerHTML = `
      <h3>${place}</h3>
      <p><strong>Magnitude:</strong> ${mag}</p>
      <p><strong>Date:</strong> ${time}</p>
    `;

    resultsDiv.appendChild(div);
  });
}
