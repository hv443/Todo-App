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


newTodos = JSON.parse(localStorage.getItem("allTodos")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = document.querySelector('.todos__form-input').value

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
  newTodoList();
  remainingTodos();
  form.reset();
});

// ! rendering new todos list

function newTodoList(emptyTodos = "No Active Todos") {

  let htmlElement = '';

  newTodos.length == 0 ? htmlElement =
    `<div class="todos__list-item item">
 
      <span  class="item__content">
       ${emptyTodos}
      </span>
    </div>`

    :

    newTodos.forEach((todo, index) => {
      htmlElement += ` 
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
        <img
          onclick="deleteSelectedTodo(${index})"
          class="delete-todo"
          src="./images/icon-cross.svg"
          alt="cancel img" />
      </div>
    </li>`;
    })

  todoList.innerHTML = htmlElement;
}

//  adding functionality

// ! checking how many todos left

function remainingTodos() {
  const allTodos = JSON.parse(localStorage.getItem("allTodos")) || newTodos;
  const remainingTodos = document.querySelector(".remain");

  const todosLeft = allTodos.filter((todo) => {
    return todo.completed == false;
  });

  remainingTodos.innerText = `${todosLeft.length} ${todosLeft.length === 1 ? "item" : "items"
    } Left`;
}

// ! deleting single todo

function deleteSelectedTodo(index) {
  newTodos.splice(index, 1);

  localStorage.setItem("allTodos", JSON.stringify(newTodos));

  remainingTodos();
  newTodoList()
}

// ! filtering todo list

filterBtn.forEach(btn => {
  btn.addEventListener('click', () => { activeFilter(btn) })
})

function activeFilter(btn) {
  filterBtn.forEach(allBtn => allBtn.classList.remove('active'))
  btn.classList.add('active')

  filterTodos(btn)
}


function filterTodos(btn) {
  const allTodos = JSON.parse(localStorage.getItem("allTodos"));
  const btnText = btn.innerText

  let emptyTodos;

  filteredTodos = allTodos.filter((todo) => {


    switch (btnText) {
      case "All":
        return todo;

      case "Active":
        return todo.completed == false;

      case "Completed":
        return todo.completed == true;

      default:
        return todo;
    }
  })

  if (btnText == "All" && filteredTodos.length < 1) {
    emptyTodos = "No Todos to display!!"
  }
  else if (btnText == "Active" && filteredTodos.length < 1) {
    emptyTodos = "No Active Todos to display!!"
  }
  else if (btnText == "Completed" && filteredTodos.length < 1) {
    emptyTodos = "You have no Completed Todos!!"
  }

  newTodos = filteredTodos;
  newTodoList(emptyTodos);
  remainingTodos();
}


// ! clear all todos

const clearCompletedTodosBtn = document.querySelector(".clear");
clearCompletedTodosBtn.addEventListener("click", clearCompletedTodos);

function clearCompletedTodos() {
  const allTodos = JSON.parse(localStorage.getItem("allTodos"));

  newTodos = allTodos.filter((todo) => {
    return todo.completed == false;
  });

  localStorage.setItem("allTodos", JSON.stringify(newTodos));

  newTodoList();
  remainingTodos();
}

// ! selecting completed todos

todoList.addEventListener("click", completedTodos)

function completedTodos(e) {

  if (e.target.matches('img') || (newTodos.length === 0)) return;

  const listItem = e.target.closest("li");
  const checkBox = listItem.firstElementChild.childNodes[1];
  const id = Number(checkBox.id);

  newTodos.forEach((todo, index) => {
    if (id == index) {
      todo.completed = !todo.completed;
    }
  });

  localStorage.setItem("allTodos", JSON.stringify(newTodos));
  remainingTodos();
  newTodoList();
}

newTodoList();
remainingTodos();

