let player = [];
let computer = [];
let gameOver = false;
const min = 1;
const max = 11;

function drawCard() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function totalRenderer(arr) {
  return arr.reduce((sum, card) => sum + card, 0);
}

function log(message) {
  const container = document.getElementById("container");
  container.insertAdjacentHTML("beforeend", `<p>${message}</p>`);
  container.scrollTop = container.scrollHeight;
}

function inject(showComputer = false) {
  const container = document.getElementById("container");
  const playerTotal = totalRenderer(player);
  const computerTotal = totalRenderer(computer);

  const renderCards = (cards, hidden = false) => {
    if (!cards.length) return `<div class="card empty">-</div>`;
    return cards
      .map((card) => `<div class="card">${hidden ? "🂠" : card}</div>`)
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
  log("Game reset. Press 'Start Game' to play!");
}

function startGame() {
  const results = document.getElementById("results");
  results.innerHTML = `
    <h3></h3>
  `;
  resetGame()
  player.push(drawCard(), drawCard());
  computer.push(drawCard(), drawCard());
  log("Game started!");
  inject();
}

function hit() {
  if (gameOver) return;
  const card = drawCard();
  player.push(card);
  log(`Player draws ${card}. Total: ${totalRenderer(player)}`);
  inject();
  const total = totalRenderer(player);
  if (total > 21) {
    const results = document.getElementById("results");
    results.innerHTML = `
    <h3>Player busts! Computer wins.</h3>
  `;
    console.log("Player busts! Computer wins.");
    gameOver = true;
    inject(true);
  } else if (total === 21) {
    const results = document.getElementById("results");
    results.innerHTML = `
    <h3>Player has drawn BlackJack!</h3>
  `;
    console.log("Player has drawn BlackJack!");
    gameOver = true;
    inject(true);
  }
  console.log("hit");
}

function stand() {
  if (gameOver) return;
  computerTurn();
}

function computerTurn() {
  gameOver = true;
  let total = totalRenderer(computer);

  function drawStep() {
    total = totalRenderer(computer);
    if (total < 17) {
      const card = drawCard();
      computer.push(card);
      log(`Computer draws ${card}. Total: ${totalRenderer(computer)}`);
      inject();
      setTimeout(drawStep, 1000);
    } else if (total === 21) {
      const results = document.getElementById("results");
      results.innerHTML = `
    <h3>Computer has drawn BlackJack!</h3>
  `;
      console.log("Computer has drawn BlackJack!");

      inject(true);
    } else if (total > 21) {
      const results = document.getElementById("results");
      results.innerHTML = `
    <h3>Computer has busted! Player Wins!");</h3>
  `;
      console.log("Computer has busted! Player Wins!");

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

  if (playerTotal > 21) {
    const results = document.getElementById("results");
    results.innerHTML = `
    <h3>Player busts! Computer wins!</h3>
  `;
  } else if (computerTotal > 21 || playerTotal > computerTotal) {
    const results = document.getElementById("results");
    results.innerHTML = `
    <h3>Player wins!</h3>
  `;
  } else if (playerTotal < computerTotal) {
    const results = document.getElementById("results");
    results.innerHTML = `
    <h3>Computer wins!</h3>
  `;
  } else {
    const results = document.getElementById("results");
    results.innerHTML = `
    <h3>It's a tie!</h3>
  `;
  }
}

document.querySelector(".startBtn").addEventListener("click", startGame);
document.querySelector(".hit").addEventListener("click", hit);
document.querySelector(".stand").addEventListener("click", stand);

