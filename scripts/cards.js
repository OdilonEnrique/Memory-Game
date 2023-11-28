function backPage() {
  const playerResp = confirm(
    "Deseja sair do jogo? Você perderá seu progresso!"
  );
  if (playerResp) {
    window.history.back();
  }
}

function createCards() {
  const cardNames = [
    "card_1",
    "card_2",
    "card_3",
    "card_4",
    "card_5",
    "card_6",
    "card_7",
    "card_8",
    "card_9",
    "card_10",
    "card_11",
    "card_12",
    "card_13",
    "card_14",
    "card_15",
    "card_16",
    "card_17",
    "card_18",
    "card_19",
  ];

  const arrayCardsName = cardNames
    .sort(() => Math.random() - 0.5)
    .filter((value, index) => index < 12);

  const sortedCards = [...arrayCardsName, ...arrayCardsName].sort(
    () => Math.random() - 0.5
  );

  gridCards.innerHTML = "";
  sortedCards.forEach((card) => {
    gridCards.innerHTML += `
        <div class="card" name="${card}">
            <div class="front">
                <img src="../images/${card}.jpg" alt="">
            </div>
            <div class="back">
                <img src="../images/yugioh-card-back.png" alt="">
            </div>
        </div>
        `;
  });
}

function checkMatchCards() {
  console.log(firstCard.getAttribute("name"));
  console.log(secondCard.getAttribute("name"));

  if (firstCard.getAttribute("name") === secondCard.getAttribute("name")) {
    new Audio("../audios/sci-fi.wav").play();

    setTimeout(() => {
      firstCard.classList.add("disableCard");
      secondCard.classList.add("disableCard");

      firstCard = "";
      secondCard = "";
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipCard");
      secondCard.classList.remove("flipCard");
      firstCard = "";
      secondCard = "";
    }, 500);
  }
}

function clickFlipCard() {
  const arrayCards = document.querySelectorAll(".card");
  arrayCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("flipCard")) return;

      new Audio("../audios/flip.wav").play();

      if (firstCard === "") {
        card.classList.add("flipCard");
        firstCard = card;
      } else if (secondCard === "") {
        card.classList.add("flipCard");
        secondCard = card;

        checkMatchCards();
      }
    });
  });
}

const playerName = document.querySelector(".playerName");
const backButton = document.querySelector(".backButton");
const gridCards = document.querySelector(".gridCards");

const storagePlayerName = localStorage.getItem("@memmoryGame:player_name");
playerName.innerHTML = storagePlayerName;

console.log(playerName.innerHTML);

backButton.addEventListener("click", backPage);

createCards();

let firstCard = "";
let secondCard = "";
clickFlipCard();
