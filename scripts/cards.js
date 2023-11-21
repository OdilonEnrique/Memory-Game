const playerName = document.querySelector(".playerName");
const storagePlayerName = localStorage.getItem("@memmoryGame:player_name")
playerName.innerHTML = storagePlayerName;

console.log(playerName.innerHTML);  