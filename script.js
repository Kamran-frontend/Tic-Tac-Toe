const boxes = document.querySelectorAll(".box");
const aiToggleButton = document.getElementById("ai-toggle");
let turn = "X";
let isGameOver = false;
let aiMode = false;
let scores = { X: 0, O: 0, AI: 0 };
let sounds = {
    click: new Audio("sounds/click.mp3"),
    win: new Audio("sounds/win.mp3"),
    draw: new Audio("sounds/draw.mp3")
};


function initializeGame() {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff";
        box.addEventListener("click", playerMove);
    });
    document.querySelector("#results").innerHTML = "";
    isGameOver = false;
}

function playerMove() {
    if (isGameOver || this.innerHTML !== "") return;

    sounds.click.play();
    this.innerHTML = turn;
    checkWin();
    if (!isGameOver) checkDraw();

    if (!isGameOver) {
        turn = turn === "X" ? "O" : "X";
        updateTurnIndicator();
        if (aiMode && turn === "O") aiMove();
    }
}

function aiMove() {
    setTimeout(() => {
        let emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
        let choice = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        if (choice) {
            choice.innerHTML = "O";
            sounds.click.play();
            checkWin();
            if (!isGameOver) checkDraw();
            turn = "X";
            updateTurnIndicator();
        }
    }, 500);
}

function updateTurnIndicator() {
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true;
            sounds.win.play();
            document.querySelector("#results").innerHTML = `${turn} Wins!`;
            document.querySelector("#play-again").style.display = "inline-block";
            if (turn === "O" && aiMode) scores.AI++;
            else scores[turn]++;
            updateScores();
            [a, b, c].forEach(index => boxes[index].style.backgroundColor = "#08D9D6");
        }
    });
}

function checkDraw() {
    if (Array.from(boxes).every(box => box.innerHTML !== "")) {
        isGameOver = true;
        sounds.draw.play();
        document.querySelector("#results").innerHTML = "It's a Draw!";
        document.querySelector("#play-again").style.display = "inline-block";
    }
}

function updateScores() {
    document.querySelector("#scoreX").innerText = scores.X;
    document.querySelector("#scoreO").innerText = scores.O;
    document.querySelector("#scoreAI").innerText = scores.AI;
}

document.querySelector("#play-again").addEventListener("click", () => {
    initializeGame();
});
document.querySelector("#reset").addEventListener("click", () => {
    scores = { X: 0, O: 0, AI: 0 };
    updateScores();
    initializeGame();
});

aiToggleButton.addEventListener("click", () => {
    aiMode = !aiMode;
    aiToggleButton.textContent = `AI-Player Mode: ${aiMode ? "ON" : "OFF"}`;
    initializeGame();
});

initializeGame();
