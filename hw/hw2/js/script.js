var score = 0;
var attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
}

// show previous attempts on page load
document.getElementById("totalAttempts").innerHTML = "Total Attempts: " + attempts;

// submit button event listener
document.getElementById("submitButton").addEventListener("click", gradeQuiz);

// display randomized multiple-choice options on page load
displayQ5Choices();

function gradeQuiz() {
  score = 0;

  gradeQ1();
  gradeQ2();
  gradeQ3();
  gradeQ4();
  gradeQ5();

  document.getElementById("totalScore").innerHTML = "Total Score: " + score;

  attempts++;
  localStorage.setItem("total_attempts", attempts);
  document.getElementById("totalAttempts").innerHTML = "Total Attempts: " + attempts;

  showFinalMessage();
}

function showFinalMessage() {
  var message = document.getElementById("message");

  if (score > 80) {
    message.innerHTML = "Congratulations! You scored above 80!";
    message.className = "pass-message";
  } else {
    message.innerHTML = "Keep practicing. Your score is below 80.";
    message.className = "fail-message";
  }
}

function rightAnswer(id) {
  document.getElementById(id).innerHTML =
    '<span class="correct">Correct!</span>' +
    '<img src="img/checkmark.png" alt="correct answer" class="answer-icon">';
}

function wrongAnswer(id) {
  document.getElementById(id).innerHTML =
    '<span class="incorrect">Incorrect!</span>' +
    '<img src="img/xmark.png" alt="incorrect answer" class="answer-icon">';
}

// Question 1 - text input
function gradeQ1() {
  var response = document.getElementById("q1").value.trim().toLowerCase();

  if (response === "sacramento") {
    rightAnswer("feedback1");
    score += 20;
  } else {
    wrongAnswer("feedback1");
  }
}

// Question 2 - dropdown
function gradeQ2() {
  var response = document.getElementById("q2").value;

  if (response === "Alaska") {
    rightAnswer("feedback2");
    score += 20;
  } else {
    wrongAnswer("feedback2");
  }
}

// Question 3 - checkboxes
function gradeQ3() {
  var washington = document.getElementById("washington").checked;
  var jefferson = document.getElementById("jefferson").checked;
  var lincoln = document.getElementById("lincoln").checked;
  var roosevelt = document.getElementById("roosevelt").checked;
  var kennedy = document.getElementById("kennedy").checked;

  if (washington && jefferson && lincoln && roosevelt && !kennedy) {
    rightAnswer("feedback3");
    score += 20;
  } else {
    wrongAnswer("feedback3");
  }
}

// Question 4 - radio buttons
function gradeQ4() {
  var response = document.querySelector('input[name="ocean"]:checked');

  if (response && response.value === "Pacific") {
    rightAnswer("feedback4");
    score += 20;
  } else {
    wrongAnswer("feedback4");
  }
}

// Question 5 - randomized multiple choice
function gradeQ5() {
  var response = document.querySelector('input[name="sunshine"]:checked');

  if (response && response.value === "Florida") {
    rightAnswer("feedback5");
    score += 20;
  } else {
    wrongAnswer("feedback5");
  }
}

function displayQ5Choices() {
  var choices = ["Florida", "California", "Nevada", "Arizona"];
  shuffleArray(choices);

  var output = "";

  for (var i = 0; i < choices.length; i++) {
    output +=
      '<input type="radio" id="choice' + i + '" name="sunshine" value="' + choices[i] + '"> ' +
      '<label for="choice' + i + '">' + choices[i] + '</label><br>';
  }

  document.getElementById("choices").innerHTML = output;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
