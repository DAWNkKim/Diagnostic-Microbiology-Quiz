let questions = [];
let current = 0;
let answers = [];

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
  });

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  let q = questions[current];
  document.getElementById("question").innerText = `Q${current+1}. ${q.question}`;

  let html = "";

  for (let key in q.choices) {
    html += `<div class="choice" onclick="select('${key}', this)">
      ${key}. ${q.choices[key]}
    </div>`;
  }

  document.getElementById("choices").innerHTML = html;
}

function select(choice, el) {
  answers[current] = choice;

  document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");
}

function nextQuestion() {
  current++;

  if (current >= questions.length) {
    showResult();
    return;
  }

  loadQuestion();
}

function showResult() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  document.getElementById("score").innerText =
    `Score: ${score} / ${questions.length}`;
}

function restartQuiz() {
  current = 0;
  answers = [];

  document.getElementById("result-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
}
