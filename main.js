const themeSwitch = document.querySelector(".theme-switch");
const body = document.querySelector("body");

const colorMode = window.matchMedia("(prefers-color-scheme : dark");

//  ! checking device color-mode and conditionally inserting color-switch icon

const switchLogo = colorMode.matches ? "sun" : "moon";

colorMode.matches ? body.classList.add("dark") : body.classList.remove("dark");
themeSwitch.src = `http://127.0.0.1:5500/images/icon-${switchLogo}.svg`;

// ! them switcher

themeSwitch.addEventListener("click", (e) => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    e.target.src = "http://127.0.0.1:5500/images/icon-sun.svg";
  } else {
    e.target.src = "http://127.0.0.1:5500/images/icon-moon.svg";
  }
});

// ! rendering todos list

const form = document.querySelector(".todos__form");
const todoList = document.querySelector(".todos__list");
const todoListItem = document.querySelectorAll(".todos__list-item");

let newTodos = [];
let filteredTodos = [];

const savedTodos = JSON.parse(localStorage.getItem("savedTodos"));
savedTodos ? (newTodos = savedTodos) : newTodos;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = e.target[0].value;

  if (!inputValue.trim()) {
    console.log("enter something");
  } else {
    newTodos.unshift({
      id: newTodos.length + 1,
      task: inputValue,
      completed: false,
    });
    localStorage.setItem("savedTodos", JSON.stringify(newTodos));
  }

  e.target[0].value = "";

  newTodoList();
  remainingTodos();
});

// ! rendering new todos list

function newTodoList() {
  let htmlElement = "";

  newTodos.forEach((todo, index) => {
    htmlElement += `<div class="todos__list-item item" onclick="completedTodos()">
    <div class="item__check">

    <input type="checkbox" id="${index}" class="checkbox" />
      <div  class="check">
        <img src="./images/icon-check.svg" alt="check svg" />
      </div>
    </div>
    <label for="${index}" class="item__content">
      <p>${todo.task}</p>
    </label>
    <div class="item__delete">
      <img 
      onclick="deleteSelectedTodo(${index})"
        class="delete-todo"
        src="./images/icon-cross.svg"
        alt="cancel img" />
    </div>
  </div>`;

    todoList.innerHTML = htmlElement;
  });
}

//  adding functionality

// ! checking how many todos left

function remainingTodos() {
  const remainingTodos = document.querySelector(".remain");

  remainingTodos.innerText = `${newTodos.length} ${
    newTodos.length === 1 ? "item" : "items"
  } Left`;
}

// ! deleting single todo

const deleteTodoBtn = document.querySelectorAll(".delete-todo");

function deleteSelectedTodo(index) {
  newTodos.splice(index, 1);

  localStorage.setItem("savedTodos", JSON.stringify(newTodos));

  newTodoList();
  remainingTodos();
}

// ! filtering todo list

const filterBtn = document.querySelectorAll(".filter");

filterBtn.forEach((btn) => {
  btn.addEventListener("click", filterTodos);
});

function filterTodos(e) {
  const oldTodos = JSON.parse(localStorage.getItem("savedTodos"));
  filteredTodos = oldTodos.filter((todo) => {
    switch (e.target.innerText) {
      case "All":
        return todo;

      case "Active":
        return todo.completed == false;

      case "Completed":
        return todo.completed == true;

      default:
        todo;
    }
  });

  newTodos = filteredTodos;
  newTodoList();
  remainingTodos();
}

// ! selecting completed todos

function completedTodos() {
  const checkedTodo = document.querySelectorAll(".checkbox");
  console.log(checkedTodo);
  console.log("ola");
}

// ! clear all todos

const clearCompletedTodosBtn = document.querySelector(".clear");
clearCompletedTodosBtn.addEventListener("click", clearCompletedTodos);

function clearCompletedTodos() {
  const notCompletedTodos = newTodos.filter((todo) => {
    return todo.completed;
  });

  newTodos = notCompletedTodos;

  newTodoList();
  remainingTodos();
}

newTodoList();
remainingTodos();
