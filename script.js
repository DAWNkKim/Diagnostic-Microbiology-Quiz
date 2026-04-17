let questions = [];
let current = 0;
let selected = "";

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  });

function loadQuestion() {
  let q = questions[current];
  document.getElementById("question").innerText = q.question;

  let html = "";
  for (let key in q.choices) {
    html += `<button onclick="select('${key}')">${key}. ${q.choices[key]}</button><br>`;
  }
  document.getElementById("choices").innerHTML = html;
}

function select(choice) {
  selected = choice;
}

function checkAnswer() {
  let q = questions[current];

  if (selected === q.answer) {
    document.getElementById("result").innerText = "정답!";
  } else {
    document.getElementById("result").innerText = "오답!";
  }

  document.getElementById("explanation").innerText = q.explanation;
}

function nextQuestion() {
  current++;
  if (current >= questions.length) current = 0;
  selected = "";
  document.getElementById("result").innerText = "";
  document.getElementById("explanation").innerText = "";
  loadQuestion();
}
