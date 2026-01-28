const player = [1,2,3,4];
const computer = [];
let keepPlaying = true
const min = 1;
const max = 11;




function drawCard() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hit() {
    const card = drawCard();
    player.push(card)

    if (player > 21) {
        log("Player busts! Computer wins.");
        resetGame();
    }
}

function stand() {
    computerTurn();
}

function computerTurn() {
    while (computer < 17) {
        const card = drawCard();
        computer += card;
        log(`Computer draws ${card}. Total: ${computer}`);
    }
    determineWinner();
}

function determineWinner() {
    if (computer > 21 || player > computer) {
        log("Player wins!");
    } else if (player < computer) {
        log("Computer wins!");
    } else {
        log("It's a tie!");
    }
    resetGame();
}

function resetGame() {
    player = 0;
    computer = 0;
    log("New game started");
}


document.getElementById("stopBtn").addEventListener("click", () => {
  running = false;
});

function totalRenderer(arr) {
    let total = 0;

    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }

    return total;
}


function inject(){
    const container = document.getElementById("container")
    container.insertAdjacentHTML(
        "afterbegin"
        `<div id="Pcard"></div>`
    )
}

