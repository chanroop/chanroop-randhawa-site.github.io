let targetNumber = generateRandomNumber();
let attempts = 0;
let wins = 0;
let losses = 0;
const maxAttempts = 7;

const playerGuessInput = document.getElementById("playerGuess");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const attemptsLeftDisplay = document.getElementById("attemptsLeft");
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const guessList = document.getElementById("guessList");

function generateRandomNumber() {
  return Math.floor(Math.random() * 99) + 1;
}

function updateDisplays() {
  attemptsLeftDisplay.textContent = maxAttempts - attempts;
  winsDisplay.textContent = wins;
  lossesDisplay.textContent = losses;
}

function setMessage(text, className = "") {
  message.textContent = text;
  message.className = "";
  if (className) {
    message.classList.add(className);
  }
}

function validateGuess(value) {
  if (value.trim() === "") {
    setMessage("Please enter a number.", "error");
    return null;
  }

  const guess = Number(value);

  if (!Number.isInteger(guess)) {
    setMessage("Please enter a whole number.", "error");
    return null;
  }

  if (guess < 1 || guess > 99) {
    setMessage("Error: number must be between 1 and 99.", "error");
    return null;
  }

  return guess;
}

function appendGuess(guess) {
  const li = document.createElement("li");
  li.textContent = guess;
  guessList.appendChild(li);
}

function endGame() {
  guessBtn.disabled = true;
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
}

function handleGuess() {
  const guess = validateGuess(playerGuessInput.value);

  if (guess === null) {
    return;
  }

  attempts++;
  appendGuess(guess);
  updateDisplays();

  if (guess === targetNumber) {
    wins++;
    updateDisplays();
    setMessage(
      `Congratulations! You guessed the number ${targetNumber} in ${attempts} attempt(s)!`,
      "success"
    );
    endGame();
    return;
  }

  if (attempts >= maxAttempts) {
    losses++;
    updateDisplays();
    setMessage(`You Lost! The correct number was ${targetNumber}.`, "error");
    endGame();
    return;
  }

  if (guess < targetNumber) {
    setMessage("Too low. Enter a higher number.", "warning");
  } else {
    setMessage("Too high. Enter a lower number.", "warning");
  }

  playerGuessInput.value = "";
  playerGuessInput.focus();
}

function resetGame() {
  targetNumber = generateRandomNumber();
  attempts = 0;
  guessList.innerHTML = "";
  playerGuessInput.value = "";
  updateDisplays();
  setMessage("New game started. Enter a number between 1 and 99.");
  guessBtn.disabled = false;
  guessBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
  playerGuessInput.focus();
}

guessBtn.addEventListener("click", handleGuess);
resetBtn.addEventListener("click", resetGame);

playerGuessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !guessBtn.disabled) {
    handleGuess();
  }
});

updateDisplays();
setMessage("Start by entering your first guess.");
