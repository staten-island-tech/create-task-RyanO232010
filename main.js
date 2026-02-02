let player = [];
let computer = [];
let winrates = [];
let gameOver = false;
const min = 2;
const max = 11;

function drawCard() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function totalRenderer(arr) {
  let total = arr.reduce((sum, card) => sum + card, 0);
  let aces = arr.filter((card) => card === 11).length;

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function inject(showComputer = false) {
  const container = document.getElementById("container");
  const playerTotal = totalRenderer(player);
  const computerTotal = totalRenderer(computer);

  const renderCards = (cards, hidden = false) => {
    if (!cards.length) return `<div class="card empty">-</div>`;

    return cards
      .map((card, index) => {
        if (hidden && index === 0) {
          return `<div class="card">?</div>`;
        }
        return `<div class="card">${card}</div>`;
      })
      .join("");
  };

  container.innerHTML = `
    <div class="player">
      <h3>Player</h3>
      <div class="cards">${renderCards(player)}</div>
      <p>Total: ${playerTotal}</p>
    </div>
    <div class="computer">
      <h3>Computer</h3>
      <div class="cards">${renderCards(computer, !showComputer)}</div>
      <p>Total: ${showComputer ? computerTotal : "?"}</p>
    </div>
  `;
}

function resetGame() {
  player = [];
  computer = [];
  gameOver = false;
  inject();
}

function startGame() {
  const results = document.getElementById("results");
  results.innerHTML = `<h3></h3>`;
  resetGame();
  player.push(drawCard(), drawCard());
  computer.push(drawCard(), drawCard());
  inject();
}

function hit() {
  if (gameOver) return;

  const card = drawCard();
  player.push(card);

  const total = totalRenderer(player);
  inject();

  if (total > 21) {
    document.getElementById("results").innerHTML =
      `<h3>Player busts! Computer wins.</h3>`;
    gameOver = true;
    inject(true);
  } else if (total === 21) {
    document.getElementById("results").innerHTML =
      `<h3>Player has drawn BlackJack!</h3>`;
    gameOver = true;
    inject(true);
  }
}

function stand() {
  if (gameOver) return;
  computerTurn();
}

function computerTurn() {
  gameOver = true;

  function drawStep() {
    const total = totalRenderer(computer);
    if (total < 17) {
      computer.push(drawCard());
      inject(true);
      setTimeout(drawStep, 1000);
    } else if (total === 21) {
      document.getElementById("results").innerHTML =
        `<h3>Computer has drawn BlackJack!</h3>`;
      inject(true);
    } else if (total > 21) {
      document.getElementById("results").innerHTML =
        `<h3>Computer has busted! Player Wins!</h3>`;
      inject(true);
    } else {
      determineWinner();
      inject(true);
    }
  }

  drawStep();
}

function determineWinner() {
  const playerTotal = totalRenderer(player);
  const computerTotal = totalRenderer(computer);
  const results = document.getElementById("results");

  if (playerTotal > 21) {
    results.innerHTML = `<h3>Player busts! Computer wins!</h3>`;
  } else if (computerTotal > 21 || playerTotal > computerTotal) {
    results.innerHTML = `<h3>Player wins!</h3>`;
  } else if (playerTotal < computerTotal) {
    results.innerHTML = `<h3>Computer wins!</h3>`;
  } else {
    results.innerHTML = `<h3>It's a tie!</h3>`;
  }
}

document.querySelector(".startBtn").addEventListener("click", startGame);
document.querySelector(".hit").addEventListener("click", hit);
document.querySelector(".stand").addEventListener("click", stand);
