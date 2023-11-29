const inputName = document.querySelector(".inputName");
const newGameButton = document.querySelector(".newGameButton");
const newGameForm = document.querySelector(".newGameForm");
const buttonRank = document.querySelector(".buttonRank");

function validateInput(event) {
  // console.log(event.target.value.length);
  if (event.target.value.length >= 3) {
    // remove disable
    newGameButton.removeAttribute("disabled");
  } else {
    newGameButton.setAttribute("disabled", "true"); //Por default o valor de disabled é true(verdadeiro)
  }
}

function handleSubmitNewGame(event) {
  event.preventDefault();
  console.log(inputName.value);
  localStorage.setItem("@memmoryGame:player_name", inputName.value);
  inputName.value = "";
  window.location.href = "pages/cards.html";
}

function navigateToRank() {
  window.location.href = "pages/rank.html";
}

inputName.addEventListener("input", validateInput);
newGameForm.addEventListener("submit", handleSubmitNewGame);
buttonRank.addEventListener("click", navigateToRank);
