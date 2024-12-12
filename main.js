let users = [];
let bugs = [];
let currentUser = null;

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const bugReportForm = document.getElementById("bug-report-form");
const bugList = document.getElementById("bug-list");
const userManagement = document.getElementById("user-management");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");

function showLoginForm() {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  bugReportForm.style.display = "none";
  bugList.style.display = "none";
  userManagement.style.display = "none";
}

function showRegisterForm() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  bugReportForm.style.display = "none";
  bugList.style.display = "none";
  userManagement.style.display = "none";
}

function showBugReportForm() {
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  bugReportForm.style.display = "block";
  bugList.style.display = "block";
  userManagement.style.display = "block";
}

document.getElementById("login").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.elements[0].value;
  const password = this.elements[1].value;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    alert("Вхід успішний!");
    showBugReportForm();
    updateNavigation();
  } else {
    alert("Невірний email або пароль");
  }
});

document.getElementById("register").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = this.elements[0].value;
  const email = this.elements[1].value;
  const password = this.elements[2].value;
  if (users.some((u) => u.email === email)) {
    alert("Користувач з таким email вже існує");
  } else {
    users.push({ name, email, password });
    alert("Реєстрація успішна! Тепер ви можете увійти.");
    showLoginForm();
  }
});

document.getElementById("bug-report").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = this.elements[0].value;
  const description = this.elements[1].value;
  const priority = this.elements[2].value;
  const newBug = { title, description, priority, reporter: currentUser.email };
  bugs.push(newBug);
  alert("Звіт про баг створено!");
  updateBugList();
  this.reset();
});

function updateBugList() {
  const bugListElement = document.getElementById("bugs");
  bugListElement.innerHTML = "";
  bugs.forEach((bug, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <h3>${bug.title}</h3>
            <p>${bug.description}</p>
            <p>Пріоритет: ${bug.priority}</p>
            <p>Репортер: ${bug.reporter}</p>
            <button onclick="copyBug(${index})">Копіювати звіт</button>
        `;
    bugListElement.appendChild(li);
  });
}

function copyBug(index) {
  const bugToCopy = bugs[index];
  const newBug = { ...bugToCopy, title: `Копія: ${bugToCopy.title}` };
  bugs.push(newBug);
  updateBugList();
  alert("Звіт скопійовано!");
}

function updateNavigation() {
  if (currentUser) {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

logoutBtn.addEventListener("click", function () {
  currentUser = null;
  showLoginForm();
  updateNavigation();
});

loginBtn.addEventListener("click", showLoginForm);
registerBtn.addEventListener("click", showRegisterForm);

showLoginForm();
updateNavigation();
