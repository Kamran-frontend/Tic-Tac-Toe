const boxes = document.querySelectorAll(".box");
const playAgainBtn = document.querySelector("#play-again");
const results = document.querySelector("#results");
const bg = document.querySelector(".bg");

let turn = "X";
let isGameOver = false;

boxes.forEach((box) => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    bg.style.left = turn === "X" ? "0" : "85px";
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    winConditions.forEach((condition) => {
        const [a, b, c] = condition;
        if (
            boxes[a].innerHTML &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML
        ) {
            isGameOver = true;
            results.innerHTML = `${turn} Wins!`;
            playAgainBtn.style.display = "inline";

            condition.forEach((index) => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
        }
    });
}

function checkDraw() {
    if (!isGameOver) {
        const isDraw = Array.from(boxes).every((box) => box.innerHTML !== "");
        if (isDraw) {
            isGameOver = true;
            results.innerHTML = "It's a Draw!";
            playAgainBtn.style.display = "inline";
        }
    }
}

playAgainBtn.addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    bg.style.left = "0";
    results.innerHTML = "";
    playAgainBtn.style.display = "none";

    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff";
    });
});
