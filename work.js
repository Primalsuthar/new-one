let CurrentQuestion = 0;
let score = 0;
let quizData = [];
let loss = 0;

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    quizData = data;
    loadQuestion();
  });

function loadQuestion() {
  document.getElementById('result').textContent = "";

  let q = quizData[CurrentQuestion];
  document.getElementById('question').textContent = q.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.style.margin = "8px";
    btn.onclick = () => {
      checkAnswer(option, q.answer);
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    };
    optionsDiv.appendChild(btn);
  });
}


function checkAnswer(option, correct) {
  const result = document.getElementById("result");
  if (option === correct) {
    result.textContent = "Correct!";
    result.style.color = "green";
    result.style.fontSize = "x-large";
    score++;
  } else {
    result.textContent = "Wrong! Correct answer: " + correct;
    result.style.color = "red";
    result.style.fontSize = "x-large";
loss++;
  }
  document.getElementById("score").innerHTML = score;
document.getElementById("profit3").innerHTML = score;
document.getElementById("loss3").innerHTML = loss;
}


function nextQuestion() {
  CurrentQuestion++;
  if (CurrentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("question").textContent = "Quiz Completed!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("result").textContent = "";
  }
}
