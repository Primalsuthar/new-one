let CurrentQuestion = 0;
let score = 0;
let quizData = [];

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    // Filter only general knowledge questions
    quizData = data.filter(q => q.question1 && q.options1 && q.answer1);
    loadQuestion1();
  });

function loadQuestion1() {
  document.getElementById('result1').textContent = "";
  let q = quizData[CurrentQuestion];
  document.getElementById('question1').textContent = q.question1;

  const optionsDiv = document.getElementById('options1');
  optionsDiv.innerHTML = "";

  q.options1.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.style.margin = "8px";
    btn.onclick = () => {
checkAnswer(option, q.answer1);
setTimeout(() => {
nextQuestion();},1000);
}
    optionsDiv.appendChild(btn);
  });

}

function checkAnswer(option, correct1) {
  const result = document.getElementById("result1");
  if (option === correct1) {
    result.textContent = " Correct!";
    result.style.color = "green";
    result.style.fontSize = "x-large";
    score++;
  } else {
    result.textContent = " Wrong! Correct answer: " + correct1;
    result.style.color = "red";
    result.style.fontSize = "x-large";
  }
  document.getElementById("score1").innerHTML = score;
}

function nextQuestion() {
  CurrentQuestion++;
  if (CurrentQuestion < quizData.length) {
    loadQuestion1();
  } else {
    document.getElementById("question1").textContent = "Quiz Complete";
    document.getElementById("options1").innerHTML = "";
    document.getElementById("result1").textContent = "";
  }
}
