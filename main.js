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

let newTodos = [];
let filteredTodos = [];

const form = document.querySelector(".todos__form");
const todoList = document.querySelector(".todos__list");
const filterBtn = document.querySelectorAll(".filter");
let activeFilterBtn = "All";

newTodos = JSON.parse(localStorage.getItem("allTodos")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = document.querySelector(".todos__form-input").value;
  activeFilterBtn = "All";

  if (!inputValue.trim()) {
    console.log("enter something");
  } else {
    newTodos.push({
      id: newTodos.length,
      task: inputValue,
      completed: false,
    });
  }

  localStorage.setItem("allTodos", JSON.stringify(newTodos));
  displayTodoList();
  activeTodosCount();
  form.reset();
});

// ! rendering new todos list

function newTodoList(todo, index) {
  let htmlElement = ` 
    <li class="todos__list-item item">
      <div class="item__check">
        <input type="checkbox" id="${index}" ${todo.completed && "checked"
    } class=${todo.completed ? "checkbox" : ""} />
        <div class="check">
          <img src="./images/icon-check.svg" alt="check svg" />
        </div>
      </div>
      <span  class="item__content ${todo.completed ? "completed-todos" : ""}">
        ${todo.task}
      </span>
      <div class="item__delete">
      <button onclick="deleteSelectedTodo(${index})"> 
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd"
       d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
       </svg>
       </button>
      </div>
    </li>`;
  todoList.innerHTML += htmlElement;
}

// ! Display Todo List

function removeAllTodos(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function displayTodoList(filterInput = activeFilterBtn) {
  const allTodos = JSON.parse(localStorage.getItem("allTodos")) || newTodos;
  removeAllTodos(todoList);

  allTodos.forEach((todo, index) => {
    if (filterInput == "All") {
      newTodoList(todo, index);
    }
    else if (filterInput == "Active" && !todo.completed) {
      newTodoList(todo, index);
    }
    else if (filterInput == "Completed" && todo.completed) {
      newTodoList(todo, index);
    }
  })

  filteredTodos = allTodos.filter((todo) => {
    switch (filterInput) {
      case "All":
        return todo;

      case "Completed":
        return todo.completed;

      case "Active":
        return !todo.completed;

      default:
        return todo;
    }
  });

  filteredTodos.length === 0 && emptyMsg(filterInput);

}
// ! when filtered array is empty

function emptyMsg(filterInput) {
  let emptyMsg =
    filterInput == "All"
      ? "No Todos to display !"
      : filterInput == "Active"
        ? "No Active Todos to display !"
        : "You have no Completed Todos !";

  todoList.innerHTML = ` <li class="todos__list-item item">

        <i class="fa-solid fa-circle-exclamation"></i>
          <span  class="item__content">
          ${emptyMsg}
            </span> 
                    </li>`;
}

//  adding functionality

// ! checking how many todos left

function activeTodosCount() {
  const allTodos = JSON.parse(localStorage.getItem("allTodos")) || newTodos;
  const activeTodosCount = document.querySelector(".remain");

  const todosLeft = allTodos.filter((todo) => {
    return todo.completed == false;
  });

  activeTodosCount.innerText = `${todosLeft.length} ${todosLeft.length === 1 ? "item" : "items"
    } Left`;
}

// ! deleting single todo

function deleteSelectedTodo(index) {
  newTodos.splice(index, 1);
  localStorage.setItem("allTodos", JSON.stringify(newTodos));

  activeTodosCount();
  displayTodoList();
}

// ! filtering todo list

filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilterBtn = btn.innerText;
    filterBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    displayTodoList(activeFilterBtn);

    // btn.innerText == activeFilterBtn &&
  });
});

// ! clear all todos

const clearCompletedTodosBtn = document.querySelector(".clear");

clearCompletedTodosBtn.addEventListener("click", clearCompletedTodos);

function clearCompletedTodos() {
  const allTodos = JSON.parse(localStorage.getItem("allTodos"));

  newTodos = allTodos.filter((todo) => {
    return todo.completed == false;
  });

  localStorage.setItem("allTodos", JSON.stringify(newTodos));

  displayTodoList();
  activeTodosCount();
}

// ! selecting completed todos

todoList.addEventListener("click", completedTodos);

function completedTodos(e) {
  if (e.target.matches("button,svg , path") || filteredTodos.length == 0)
    return;

  const listItem = e.target.closest("li");
  const checkBox = listItem.firstElementChild.childNodes[1];
  const id = Number(checkBox.id);

  newTodos[id].completed = !newTodos[id].completed;

  localStorage.setItem("allTodos", JSON.stringify(newTodos));
  activeTodosCount();
  displayTodoList();
}

// ! sorting Array
Sortable.create(todoList, { animation: 150 });

console.log(todoList);

///////////

displayTodoList();
activeTodosCount();
