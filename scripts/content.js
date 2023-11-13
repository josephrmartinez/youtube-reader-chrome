// document.addEventListener('yt-navigate-finish', process);
// // Choose a different event depending on when you want to apply the change
// // document.addEventListener('yt-navigate-finish', process);

// if (document.body) process();
// else 

document.addEventListener('DOMContentLoaded', process);

function process() {
  const primary = document.querySelector("#primary")
  console.log("primary", primary)
};