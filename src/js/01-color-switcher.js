const refs = {
    buttonStart: document.querySelector("button[data-start]"),
    buttonStop: document.querySelector("button[data-stop]"),
    body: document.querySelector("body"),
};

let timerId = null;

refs.buttonStop.disabled = true;

refs.buttonStart.addEventListener("click", onButtonStart);
refs.buttonStop.addEventListener("click", onButtonStop);

function onButtonStart() {
    refs.buttonStop.disabled = false;
    refs.buttonStart.disabled = true;

    timerId = setInterval(() => {
        refs.body.style.background = getRandomHexColor(); 
     }, 1000);
}

function onButtonStop() {
    refs.buttonStop.disabled = true;
    refs.buttonStart.disabled = false;

    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}