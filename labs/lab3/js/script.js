document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", getSuggestedPassword);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
  validateForm(event);
});

loadStates();

async function displayCity() {
  let zipCode = document.querySelector("#zip").value.trim();
  let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;

  let response = await fetch(url);
  let data = await response.json();

  let zipError = document.querySelector("#zipError");

  document.querySelector("#city").innerHTML = "";
  document.querySelector("#latitude").innerHTML = "";
  document.querySelector("#longitude").innerHTML = "";
  zipError.innerHTML = "";

  if (!data || data === false || data.city === undefined || data.city === false) {
    zipError.innerHTML = "Zip code not found";
    zipError.style.color = "red";
    return;
  }

  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#latitude").innerHTML = data.latitude;
  document.querySelector("#longitude").innerHTML = data.longitude;
}

async function loadStates() {
  let url = "https://csumb.space/api/allStatesAPI.php";

  let response = await fetch(url);
  let data = await response.json();

  let stateList = document.querySelector("#state");
  stateList.innerHTML = '<option value="">Select One</option>';

  for (let i = 0; i < data.length; i++) {
    let code = data[i].usps || data[i].abbreviation || data[i].abbr || data[i].code;
    let name = data[i].state || data[i].name;

    stateList.innerHTML += `<option value="${code}">${name}</option>`;
  }
}

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

async function checkUsername() {
  let username = document.querySelector("#username").value.trim();
  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;

  let response = await fetch(url);
  let data = await response.json();

  let usernameError = document.querySelector("#usernameError");
  usernameError.innerHTML = "";

  if (data.available) {
    usernameError.innerHTML = "Username available!";
    usernameError.style.color = "green";
  } else {
    usernameError.innerHTML = "Username taken";
    usernameError.style.color = "red";
  }
}

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

function validateForm(e) {
  let isValid = true;

  let username = document.querySelector("#username").value.trim();
  let password = document.querySelector("#password").value;
  let retypePassword = document.querySelector("#retypePassword").value;

  let usernameError = document.querySelector("#usernameError");
  let passwordError = document.querySelector("#passwordError");

  usernameError.innerHTML = "";
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
