const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const message = document.getElementById("message");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        resultMessage.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        showResultScreen();
    } else if (isDraw()) {
        resultMessage.textContent = "It's a draw!";
        gameActive = false;
        showResultScreen();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === currentPlayer);
    });
}

function isDraw() {
    return boardState.every(cell => cell !== "");
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    hideResultScreen();
}

function showResultScreen() {
    resultScreen.classList.remove("hidden");
}

function hideResultScreen() {
    resultScreen.classList.add("hidden");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

resetGame();
