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

let newTodos = [];

const savedTodos = JSON.parse(localStorage.getItem("savedTodos"));
savedTodos.length > 0 ? (newTodos = savedTodos) : newTodos;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = e.target[0].value;

  if (!inputValue.trim()) {
    console.log("enter something");
  } else {
    newTodos.push({
      id: newTodos.length + 1,
      task: inputValue,
      completed: false,
    });
  }

  localStorage.setItem("savedTodos", JSON.stringify(newTodos));
  form.reset();

  newTodoList();
  remainingTodos();
});

// ! rendering new todos list

function newTodoList() {
  let htmlElement = "";

  newTodos.forEach((todo, index) => {
    htmlElement += ` 
  <li class="todos__list-item item">
      <div class="item__check">
        <input type="checkbox" id="${todo.id}" class=${
      todo.completed && "checkbox"
    } />
        <div class="check">
          <img src="./images/icon-check.svg" alt="check svg" />
        </div>
      </div>
      <span  class="item__content ${todo.completed && "completedTodo"}">
        ${todo.task}
      </span>
      <div class="item__delete">
        <img
          onclick="deleteSelectedTodo(${index})"
          class="delete-todo"
          src="./images/icon-cross.svg"
          alt="cancel img" />
      </div>
  </li>`;

    todoList.innerHTML = htmlElement;
  });
}

//  adding functionality

// ! checking how many todos left

function remainingTodos() {
  const remainingTodos = document.querySelector(".remain");

  const todosLeft = newTodos.filter((todo) => {
    return todo.completed == false;
  });

  remainingTodos.innerText = `${todosLeft.length} ${
    todosLeft.length === 1 ? "item" : "items"
  } Left`;
}

// ! deleting single todo

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
  const storedTodos = JSON.parse(localStorage.getItem("savedTodos"));

  const filteredTodos = storedTodos.filter((todo) => {
    switch (e.target.innerText) {
      case "All":
        return todo;

      case "Active":
        return todo.completed == false;

      case "Completed":
        return todo.completed == true;

      default:
        return todo;
    }
  });

  newTodos = filteredTodos;
  newTodoList();
  remainingTodos();
}

// ! clear all todos

const clearCompletedTodosBtn = document.querySelector(".clear");
clearCompletedTodosBtn.addEventListener("click", clearCompletedTodos);

function clearCompletedTodos() {
  const storedTodos = JSON.parse(localStorage.getItem("savedTodos"));

  newTodos = storedTodos.filter((todo) => {
    return todo.completed == false;
  });

  localStorage.setItem("savedTodos", JSON.stringify(newTodos));

  newTodoList();
  remainingTodos();
}

// ! selecting completed todos

todoList.addEventListener("click", completedTodos);

function completedTodos(e) {
  e.stopPropagation();

  const listItem = e.target.closest("li");
  const checkBox = listItem.firstElementChild.childNodes[1];
  const id = Number(checkBox.id);

  newTodos.forEach((todo) => {
    console.log(id + 1, todo.id);

    if (id == todo.id) {
      return (todo.completed = !todo.completed);
    }
    todo.completed ? checkBox.checkBox : !checkBox.checkBox;
  });

  localStorage.setItem("savedTodos", JSON.stringify(newTodos));
  remainingTodos();
  newTodoList();
}

newTodoList();
remainingTodos();
