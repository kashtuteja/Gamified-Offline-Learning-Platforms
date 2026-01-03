// ================== USER & POINTS ==================
let points = parseInt(localStorage.getItem("points")) || 0;
let user = localStorage.getItem("user") || "";

// ================== QUIZ DATA ==================
const quizQuestions = [
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "None"
    ],
    answer: 0
  },
  {
    question: "CSS is used for?",
    options: ["Structure", "Styling", "Logic", "Database"],
    answer: 1
  },
  {
    question: "Which language runs in browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "#", "**"],
    answer: 1
  }
];

let currentQuestion = 0;

// ================== SCREEN CONTROL ==================
function show(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// ================== LOGIN ==================
function login() {
  user = document.getElementById("username").value;
  localStorage.setItem("user", user);
  update();
  show("dashboard");
}

// ================== QUIZ FUNCTIONS ==================
function loadQuiz() {
  const q = quizQuestions[currentQuestion];

  document.getElementById("quizQuestion").innerText = q.question;

  const optionsDiv = document.getElementById("quizOptions");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(index);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === quizQuestions[currentQuestion].answer) {
    points += 10;
    alert("Correct! +10 Points");
  } else {
    alert("Wrong Answer!");
  }

  localStorage.setItem("points", points);
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    loadQuiz();
  } else {
    alert("Quiz Completed!");
    currentQuestion = 0;
    show("dashboard");
    update();
  }
}

// ================== GAMIFICATION ==================
function calculateLevel() {
  if (points >= 50) return 3;
  if (points >= 20) return 2;
  return 1;
}

function getBadge() {
  if (points >= 50) return "Gold Learner 🥇";
  if (points >= 20) return "Silver Learner 🥈";
  return "Beginner 🟢";
}

function generatePlan() {
  if (points < 20)
    return "Focus more on Math & Science (Weak Areas)";
  else
    return "Balanced study plan across all subjects";
}

// ================== UPDATE DASHBOARD ==================
function update() {
  document.getElementById("welcome").innerText = "Welcome " + user;
  document.getElementById("points").innerText = points;
  document.getElementById("level").innerText = calculateLevel();
  document.getElementById("badge").innerText = getBadge();
  document.getElementById("progress").innerText = Math.min(points, 100);
  document.getElementById("plannerText").innerText = generatePlan();
  document.getElementById("leaderData").innerText =
    user + " : " + points + " points";
}

// ================== INITIAL LOAD ==================
show(user ? "dashboard" : "login");
update();
