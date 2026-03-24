{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var score = 0;\
var attempts = localStorage.getItem("total_attempts") || 0;\
\
document.getElementById("submitButton").addEventListener("click", gradeQuiz);\
\
displayQ5Choices();\
document.getElementById("totalAttempts").innerHTML = "Total Attempts: " + attempts;\
\
function gradeQuiz() \{\
  score = 0;\
\
  gradeQ1();\
  gradeQ2();\
  gradeQ3();\
  gradeQ4();\
  gradeQ5();\
\
  document.getElementById("totalScore").innerHTML = "Total Score: " + score;\
\
  attempts++;\
  localStorage.setItem("total_attempts", attempts);\
  document.getElementById("totalAttempts").innerHTML = "Total Attempts: " + attempts;\
\
  if (score > 80) \{\
    document.getElementById("message").innerHTML = "Congratulations! Great job!";\
  \} else \{\
    document.getElementById("message").innerHTML = "";\
  \}\
\}\
\
function rightAnswer(id) \{\
  document.getElementById(id).innerHTML =\
    '<span class="correct">Correct!</span> <img src="img/correct.png" alt="correct" class="answer-icon">';\
\}\
\
function wrongAnswer(id) \{\
  document.getElementById(id).innerHTML =\
    '<span class="incorrect">Incorrect!</span> <img src="img/wrong.png" alt="wrong" class="answer-icon">';\
\}\
\
function gradeQ1() \{\
  let response = document.getElementById("q1").value.trim().toLowerCase();\
\
  if (response === "sacramento") \{\
    rightAnswer("feedback1");\
    score += 20;\
  \} else \{\
    wrongAnswer("feedback1");\
  \}\
\}\
\
function gradeQ2() \{\
  let response = document.getElementById("q2").value;\
\
  if (response === "Alaska") \{\
    rightAnswer("feedback2");\
    score += 20;\
  \} else \{\
    wrongAnswer("feedback2");\
  \}\
\}\
\
function gradeQ3() \{\
  let washington = document.getElementById("washington").checked;\
  let jefferson = document.getElementById("jefferson").checked;\
  let lincoln = document.getElementById("lincoln").checked;\
  let roosevelt = document.getElementById("roosevelt").checked;\
  let kennedy = document.getElementById("kennedy").checked;\
\
  if (washington && jefferson && lincoln && roosevelt && !kennedy) \{\
    rightAnswer("feedback3");\
    score += 20;\
  \} else \{\
    wrongAnswer("feedback3");\
  \}\
\}\
\
function gradeQ4() \{\
  let response = document.querySelector('input[name="ocean"]:checked');\
\
  if (response && response.value === "Pacific") \{\
    rightAnswer("feedback4");\
    score += 20;\
  \} else \{\
    wrongAnswer("feedback4");\
  \}\
\}\
\
function gradeQ5() \{\
  let response = document.querySelector('input[name="sunshine"]:checked');\
\
  if (response && response.value === "Florida") \{\
    rightAnswer("feedback5");\
    score += 20;\
  \} else \{\
    wrongAnswer("feedback5");\
  \}\
\}\
\
function displayQ5Choices() \{\
  let choices = ["Florida", "California", "Nevada", "Arizona"];\
  shuffleArray(choices);\
\
  let output = "";\
  for (let i = 0; i < choices.length; i++) \{\
    output += `\
      <input type="radio" id="choice$\{i\}" name="sunshine" value="$\{choices[i]\}">\
      <label for="choice$\{i\}">$\{choices[i]\}</label><br>\
    `;\
  \}\
\
  document.getElementById("choices").innerHTML = output;\
\}\
\
function shuffleArray(array) \{\
  for (let i = array.length - 1; i > 0; i--) \{\
    let j = Math.floor(Math.random() * (i + 1));\
    let temp = array[i];\
    array[i] = array[j];\
    array[j] = temp;\
  \}\
\}}