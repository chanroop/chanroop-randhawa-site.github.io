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

  const daysApart =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

  if (daysApart > 60 && Number(magnitude) < 4) {
    message.textContent =
      "Please use a shorter date range or a higher minimum magnitude.";
    message.className = "error";
    return;
  }

  message.textContent = "Loading earthquake data...";
  message.className = "";

  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=${magnitude}&orderby=time&limit=50`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}. Try a smaller date range or higher magnitude.`
      );
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
    console.error(error);
  }
});

function getMagnitudeClass(mag) {
  if (mag < 4) {
    return "low";
  } else if (mag < 6) {
    return "medium";
  } else {
    return "high";
  }
}

function displayQuakes(quakes) {
  resultsDiv.innerHTML = "";

  quakes.forEach((q) => {
    const place = q.properties.place;
    const mag = q.properties.mag;
    const time = new Date(q.properties.time).toLocaleString();
    const detailsUrl = q.properties.url;
    const magClass = getMagnitudeClass(mag);

    const div = document.createElement("div");
    div.classList.add("quake");

    div.innerHTML = `
      <span class="badge ${magClass}">Magnitude ${mag}</span>
      <h3>${place}</h3>
      <p><strong>Date:</strong> ${time}</p>
      <p><strong>More Info:</strong> <a href="${detailsUrl}" target="_blank">USGS Event Page</a></p>
    `;

    resultsDiv.appendChild(div);
  });
}
