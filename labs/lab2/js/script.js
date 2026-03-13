let targetNumber = Math.floor(Math.random() * 99) + 1;
let attempts = 0;
let wins = 0;
let losses = 0;
const maxAttempts = 7;
let previousGuesses = [];

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const errorMessage = document.getElementById("errorMessage");
const guessList = document.getElementById("guessList");
const attemptsDisplay = document.getElementById("attempts");
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");

function updateScoreboard() {
  attemptsDisplay.textContent = attempts;
  winsDisplay.textContent = wins;
  lossesDisplay.textContent = losses;
}

function updateGuessList() {
  if (previousGuesses.length === 0) {
    guessList.textContent = "None yet.";
  } else {
    guessList.textContent = previousGuesses.join(", ");
  }
}

function endGame() {
  guessBtn.disabled = true;
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  guessInput.disabled = true;
}

function validateGuess(value) {
  if (value.trim() === "") {
    errorMessage.textContent = "Please enter a number.";
    return null;
  }

  const guess = Number(value);

  if (!Number.isInteger(guess)) {
    errorMessage.textContent = "Please enter a whole number.";
    return null;
  }

  if (guess < 1 || guess > 99) {
    errorMessage.textContent = "Error: number must be between 1 and 99.";
    return null;
  }

  errorMessage.textContent = "";
  return guess;
}

function handleGuess() {
  const guess = validateGuess(guessInput.value);
  if (guess === null) return;

  attempts++;
  previousGuesses.push(guess);

  updateScoreboard();
  updateGuessList();

  if (guess === targetNumber) {
    message.textContent = `Congratulations! You guessed the number ${targetNumber} in ${attempts} attempt(s)!`;
    message.className = "win-message";
    wins++;
    updateScoreboard();
    endGame();
    return;
  }

  if (attempts >= maxAttempts) {
    message.textContent = `You Lost! The correct number was ${targetNumber}.`;
    message.className = "lose-message";
    losses++;
    updateScoreboard();
    endGame();
    return;
  }

  if (guess < targetNumber) {
    message.textContent = "Too low. Try a higher number.";
    message.className = "hint-message";
  } else {
    message.textContent = "Too high. Try a lower number.";
    message.className = "hint-message";
  }

  guessInput.value = "";
  guessInput.focus();
}

function resetGame() {
  targetNumber = Math.floor(Math.random() * 99) + 1;
  attempts = 0;
  previousGuesses = [];

  guessInput.disabled = false;
  guessInput.value = "";
  guessBtn.disabled = false;
  guessBtn.style.display = "inline-block";
  resetBtn.style.display = "none";

  message.textContent = "Start the game by entering a number.";
  message.className = "";
  errorMessage.textContent = "";

  updateScoreboard();
  updateGuessList();
  guessInput.focus();
}

guessBtn.addEventListener("click", handleGuess);

guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !guessBtn.disabled) {
    handleGuess();
  }
});

resetBtn.addEventListener("click", resetGame);

updateScoreboard();
updateGuessList();
