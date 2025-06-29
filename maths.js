let CurrentQuestion = 0;
let score = 0;
let quizData = [];
let loss = 0;

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    quizData = data.filter(q => q.question2 && q.options2 && q.answer2);
    loadQuestion2();
  });

function loadQuestion2() {
     document.getElementById('result2').textContent = "";
  let q = quizData[CurrentQuestion];
  document.getElementById('question2').textContent = q.question2;

  const optionsDiv = document.getElementById('options2');
  optionsDiv.innerHTML = "";

  q.options2.forEach(option => {
  const btn = document.createElement("button");
  btn.textContent = option;
  btn.style.margin = "8px";
  btn.onclick = () => {
    checkAnswer(option, q.answer2);
    setTimeout(() => {
      nextQuestion();
    }, 800);
    
  };
  optionsDiv.appendChild(btn);
});


}

function checkAnswer(option, correct2) {
  const result = document.getElementById("result2");
  if (option === correct2) {
    result.textContent = " Correct!";
    result.style.color = "green";
    result.style.fontSize = "x-large";
    score++;
  } else {
    result.textContent = " Wrong! Correct answer: " + correct2;
    result.style.color = "red";
    result.style.fontSize = "x-large";
    loss++;
  }
  document.getElementById("score2").innerHTML = score;
    document.getElementById("profit").innerHTML = score;
   document.getElementById("loss2").innerHTML = loss;
}

function nextQuestion() {
  CurrentQuestion++;
  if (CurrentQuestion < quizData.length) {
    loadQuestion2();
  } else {
    document.getElementById("question2").textContent = "Quiz Complete";
    document.getElementById("options2").innerHTML = "";
    document.getElementById("result2").textContent = "";
  }
}
