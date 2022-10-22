const themeSwitch = document.querySelector(".theme-switch");
const body = document.querySelector("body");

const colorMode = window.matchMedia("(prefers-color-scheme : dark");

// checking device color-mode and conditionally inserting color-switch icon

const switchLogo = colorMode.matches ? "sun" : "moon";

colorMode.matches ? body.classList.add("dark") : body.classList.remove("dark");
themeSwitch.src = `http://127.0.0.1:5500/images/icon-${switchLogo}.svg`;

//them switcher

themeSwitch.addEventListener("click", (e) => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    e.target.src = "http://127.0.0.1:5500/images/icon-sun.svg";
  } else {
    e.target.src = "http://127.0.0.1:5500/images/icon-moon.svg";
  }
});

// todos list //

const form = document.querySelector(".todos__form");
const todoList = document.querySelector(".todos__list");
const todoListItem = document.querySelectorAll(".todos__list-item");
const deleteTodoBtn = document.querySelectorAll(".delete-todo");

const newTodos = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = e.target[0].value;

  if (!inputValue) {
    return;
  } else {
    newTodos.push(inputValue);
  }

  e.target[0].value = "";
  newTodoList();
});

function newTodoList() {
  let htmlElement = "";

  newTodos.forEach((todo, index) => {
    htmlElement += ` <div class="todos__list-item item">
    <div class="item__check">
      <input type="checkbox" id=${index} class="check" />
    </div>
    <label for=${index} class="item__content">
      <p>${todo}</p>
    </label>
    <div class="item__delete">
      <img
        class="delete-todo"
        src="./images/icon-cross.svg"
        alt="cancel img" />
    </div>
  </div>`;
    todoList.innerHTML = htmlElement;
  });
}

deleteTodoBtn.forEach((btn) => {
  btn.addEventListener("click", deleteTodo);
});

function deleteTodo(e) {
  console.log(e.target);
}
