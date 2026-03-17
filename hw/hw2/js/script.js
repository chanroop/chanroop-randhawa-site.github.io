var score = 0;
var attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
}

document.getElementById("totalAttempts").innerHTML = "Total Attempts: " + attempts;

document.getElementById("submitButton").addEventListener("click", gradeQuiz);

displayQ9Choices();
displayQ10Choices();

function gradeQuiz() {
  score = 0;

  gradeQ1();
  gradeQ2();
  gradeQ3();
  gradeQ4();
  gradeQ5();
  gradeQ6();
  gradeQ7();
  gradeQ8();
  gradeQ9();
  gradeQ10();

  document.getElementById("totalScore").innerHTML = "Total Score: " + score + "/100";

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

function gradeQ1() {
  var response = document.getElementById("q1").value.trim().toLowerCase();

  if (response === "sacramento") {
    rightAnswer("feedback1");
    score += 10;
  } else {
    wrongAnswer("feedback1");
  }
}

function gradeQ2() {
  var response = document.getElementById("q2").value.trim().toLowerCase();

  if (response === "austin") {
    rightAnswer("feedback2");
    score += 10;
  } else {
    wrongAnswer("feedback2");
  }
}

function gradeQ3() {
  var response = document.getElementById("q3").value.trim().toLowerCase();

  if (response === "albany") {
    rightAnswer("feedback3");
    score += 10;
  } else {
    wrongAnswer("feedback3");
  }
}

function gradeQ4() {
  var response = document.getElementById("q4").value.trim().toLowerCase();

  if (response === "tallahassee") {
    rightAnswer("feedback4");
    score += 10;
  } else {
    wrongAnswer("feedback4");
  }
}

function gradeQ5() {
  var response = document.getElementById("q5").value.trim().toLowerCase();

  if (response === "carson city") {
    rightAnswer("feedback5");
    score += 10;
  } else {
    wrongAnswer("feedback5");
  }
}

function gradeQ6() {
  var response = document.getElementById("q6").value;

  if (response === "Alaska") {
    rightAnswer("feedback6");
    score += 10;
  } else {
    wrongAnswer("feedback6");
  }
}

function gradeQ7() {
  var washington = document.getElementById("washington").checked;
  var jefferson = document.getElementById("jefferson").checked;
  var lincoln = document.getElementById("lincoln").checked;
  var roosevelt = document.getElementById("roosevelt").checked;
  var kennedy = document.getElementById("kennedy").checked;

  if (washington && jefferson && lincoln && roosevelt && !kennedy) {
    rightAnswer("feedback7");
    score += 10;
  } else {
    wrongAnswer("feedback7");
  }
}

function gradeQ8() {
  var response = document.querySelector('input[name="ocean"]:checked');

  if (response && response.value === "Pacific") {
    rightAnswer("feedback8");
    score += 10;
  } else {
    wrongAnswer("feedback8");
  }
}

function gradeQ9() {
  var response = document.querySelector('input[name="sunshine"]:checked');

  if (response && response.value === "Florida") {
    rightAnswer("feedback9");
    score += 10;
  } else {
    wrongAnswer("feedback9");
  }
}

function gradeQ10() {
  var response = document.querySelector('input[name="canyon"]:checked');

  if (response && response.value === "Arizona") {
    rightAnswer("feedback10");
    score += 10;
  } else {
    wrongAnswer("feedback10");
  }
}

function displayQ9Choices() {
  var choices = ["Florida", "California", "Nevada", "Virginia"];
  shuffleArray(choices);

  var output = "";

  for (var i = 0; i < choices.length; i++) {
    output +=
      '<input type="radio" id="sunshine' + i + '" name="sunshine" value="' + choices[i] + '"> ' +
      '<label for="sunshine' + i + '">' + choices[i] + '</label><br>';
  }

  document.getElementById("choices9").innerHTML = output;
}

function displayQ10Choices() {
  var choices = ["Arizona", "Texas", "Oregon", "Utah"];
  shuffleArray(choices);

  var output = "";

  for (var i = 0; i < choices.length; i++) {
    output +=
      '<input type="radio" id="canyon' + i + '" name="canyon" value="' + choices[i] + '"> ' +
      '<label for="canyon' + i + '">' + choices[i] + '</label><br>';
  }

  document.getElementById("choices10").innerHTML = output;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
