const themeSwitch = document.querySelector(".theme-switch");
const body = document.querySelector("body");

const colorMode = window.matchMedia("(prefers-color-scheme : dark");

// checking device color-mode and conditionally inserting color-switch icon

colorMode.matches
  ? ((themeSwitch.src = "http://127.0.0.1:5500/images/icon-sun.svg"),
    body.classList.add("dark"))
  : ((themeSwitch.src = "http://127.0.0.1:5500/images/icon-moon.svg"),
    body.classList.remove("dark"));

//them switcher

themeSwitch.addEventListener("click", (e) => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    e.target.src = "http://127.0.0.1:5500/images/icon-sun.svg";
  } else {
    e.target.src = "http://127.0.0.1:5500/images/icon-moon.svg";
  }
});
