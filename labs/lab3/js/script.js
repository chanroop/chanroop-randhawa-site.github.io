// event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", getSuggestedPassword);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
  validateForm(event);
});

// load all states when page loads
loadStates();


// Display city, latitude, and longitude based on zip code
async function displayCity() {
  let zipCode = document.querySelector("#zip").value;
  let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;

  let response = await fetch(url);
  let data = await response.json();

  let zipError = document.querySelector("#zipError");

  if (data === false) {
    document.querySelector("#city").innerHTML = "";
    document.querySelector("#latitude").innerHTML = "";
    document.querySelector("#longitude").innerHTML = "";
    zipError.innerHTML = "Zip code not found";
    zipError.style.color = "red";
    return;
  }

  zipError.innerHTML = "";
  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#latitude").innerHTML = data.latitude;
  document.querySelector("#longitude").innerHTML = data.longitude;
}


// Load all US states from API
async function loadStates() {
  let url = "https://csumb.space/api/allStatesAPI.php";

  let response = await fetch(url);
  let data = await response.json();

  let stateList = document.querySelector("#state");
  stateList.innerHTML = '<option value="">Select One</option>';

  for (let i = 0; i < data.length; i++) {
    stateList.innerHTML += `<option value="${data[i].usps}">${data[i].state}</option>`;
  }
}


// Display counties based on selected state
async function displayCounties() {
  let state = document.querySelector("#state").value;
  let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;

  let response = await fetch(url);
  let data = await response.json();

  let countyList = document.querySelector("#county");
  countyList.innerHTML = "<option>Select County</option>";

  for (let i = 0; i < data.length; i++) {
    countyList.innerHTML += `<option>${data[i].county}</option>`;
  }
}


// Check whether username is available
async function checkUsername() {
  let username = document.querySelector("#username").value;
  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;

  let response = await fetch(url);
  let data = await response.json();

  let usernameError = document.querySelector("#usernameError");

  if (data.available) {
    usernameError.innerHTML = "Username available!";
    usernameError.style.color = "green";
  } else {
    usernameError.innerHTML = "Username taken";
    usernameError.style.color = "red";
  }
}


// Display suggested password when password box is clicked
async function getSuggestedPassword() {
  let url = "https://csumb.space/api/suggestedPassword.php?length=8";

  let response = await fetch(url);
  let data = await response.json();

  if (data.password) {
    document.querySelector("#suggestedPwd").innerHTML = "Suggested Password: " + data.password;
  } else {
    document.querySelector("#suggestedPwd").innerHTML = "Suggested Password: " + data;
  }
}


// Validate form data before submit
function validateForm(e) {
  let isValid = true;

  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let retypePassword = document.querySelector("#retypePassword").value;

  let usernameError = document.querySelector("#usernameError");
  let passwordError = document.querySelector("#passwordError");

  passwordError.innerHTML = "";

  if (username.length === 0) {
    usernameError.innerHTML = "Username Required!";
    usernameError.style.color = "red";
    isValid = false;
  }

  if (password.length < 6) {
    passwordError.innerHTML += "Password must be at least 6 characters.<br>";
    passwordError.style.color = "red";
    isValid = false;
  }

  if (password !== retypePassword) {
    passwordError.innerHTML += "Passwords do not match.";
    passwordError.style.color = "red";
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault();
  }
}
