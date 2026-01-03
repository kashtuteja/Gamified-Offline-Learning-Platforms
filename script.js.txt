let points = parseInt(localStorage.getItem("points")) || 0;
let user = localStorage.getItem("user") || "";

function show(id){
  document.querySelectorAll(".screen")
    .forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function login(){
  user = document.getElementById("username").value;
  localStorage.setItem("user", user);
  update();
  show("dashboard");
}

function answer(correct){
  if(correct){
    points += 10;
    alert("+10 Points!");
  }
  localStorage.setItem("points", points);
  update();
  show("dashboard");
}

function calculateLevel(){
  if(points >= 50) return 3;
  if(points >= 20) return 2;
  return 1;
}

function getBadge(){
  if(points >= 50) return "Gold Learner";
  if(points >= 20) return "Silver Learner";
  return "Beginner";
}

function generatePlan(){
  if(points < 20)
    return "Focus more on Math & Science (Weak Areas)";
  else
    return "Balanced study plan across all subjects";
}

function update(){
  document.getElementById("welcome").innerText = "Welcome " + user;
  document.getElementById("points").innerText = points;
  document.getElementById("level").innerText = calculateLevel();
  document.getElementById("badge").innerText = getBadge();
  document.getElementById("progress").innerText = Math.min(points, 100);
  document.getElementById("plannerText").innerText = generatePlan();
  document.getElementById("leaderData").innerText =
    user + " : " + points + " points";
}

show(user ? "dashboard" : "login");
update();
