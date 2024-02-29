function backPage() {
  if (gamesIsFinished) {
    window.history.back();
  } else {
    const playerResp = confirm(
      "Deseja sair do jogo? Você perderá seu progresso!"
    );
    if (playerResp) {
      window.history.back();
    }
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
    "card_20",
    "card_21",
    "card_22",
    "card_23",
    "card_24",
    "card_25",
    "card_26",
    "card_27",
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

function checkGameWin() {
  const disableCard = document.querySelectorAll(".disableCard");
  if (disableCard.length === 24) {
    clearInterval(finishTimerInterval);

    gamesIsFinished = true;

    const userData = {
      name: storagePlayerName,
      time: timer.textContent,
    };

    const storageRank = JSON.parse(localStorage.getItem("@memmoryGame:rank"));

    if (storageRank) {
      const rankData = [...storageRank, userData];

      localStorage.setItem("@memmoryGame:rank", JSON.stringify(rankData));
    } else {
      localStorage.setItem("@memmoryGame:rank", JSON.stringify([userData]));
    }

    alert(
      `Parabéns ${storagePlayerName}, você venceu com um tempo de ${timer.innerHTML}!`
    );

    backPage();
  }
}

function checkMatchCards() {
  if (firstCard.getAttribute("name") === secondCard.getAttribute("name")) {
    new Audio("../audios/sci-fi.wav").play();

    setTimeout(() => {
      firstCard.classList.add("disableCard");
      secondCard.classList.add("disableCard");

      firstCard = "";
      secondCard = "";

      checkGameWin();
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

function setStartTimer() {
  finishTimerInterval = setInterval(() => {
    const dateNow = new Date();
    const dateDiff = new Date(dateNow - initialDateTimer);
    const minutes = String(dateDiff.getMinutes()).padStart("2", "0");
    const seconds = String(dateDiff.getSeconds()).padStart("2", "0"); //Formatação dos minutos e dos segundos nas linhas 111 e 112

    timer.innerHTML = `${minutes}:${seconds}`;
  }, 1000); //Valor em milissegundos
}

const playerName = document.querySelector(".playerName");
const backButton = document.querySelector(".backButton");
const gridCards = document.querySelector(".gridCards");
const timer = document.querySelector(".timer");

const storagePlayerName = localStorage.getItem("@memmoryGame:player_name");
playerName.innerHTML = storagePlayerName;

backButton.addEventListener("click", backPage);

createCards();

let gamesIsFinished = false;
let firstCard = "";
let secondCard = "";
clickFlipCard();

const initialDateTimer = new Date();
let finishTimerInterval;
setStartTimer();
