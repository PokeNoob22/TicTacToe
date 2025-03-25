let board = document.getElementById("board");
let prev = document.getElementById("prev");
let next = document.createElement("button");
next.id = "next";
next.textContent = "Next";
document.getElementById("show").appendChild(next);

let playerTurnElement = document.getElementById("playerTurn");
let gameContainer = document.getElementById("container");
let playerChoiceModal = document.getElementById("playerChoiceModal");

let gameBoard = [

    ['', '', ''],

    ['', '', ''],

    ['', '', '']

];

let state = [JSON.parse(JSON.stringify(gameBoard))];  // Store initial empty state
let moves = 0;
let playerTurn1 = true;
let player1Symbol = "X";
let player2Symbol = "O";
let gameOver = false;
let currentStateIndex = 0;

// Hide Previous and Next
function updateButtonVisibility() {
    
    prev.style.display = currentStateIndex > 0 ? "inline-block" : "none";
    next.style.display = currentStateIndex < state.length - 1 ? "inline-block" : "none";
}

// Initial visibility check
updateButtonVisibility();

// Event listeners for Player 1s symbol choice
document.getElementById("chooseX").addEventListener("click", () => {
    player1Symbol = "X";
    player2Symbol = "O";
    startGame();
});

document.getElementById("chooseO").addEventListener("click", () => {
    player1Symbol = "O";
    player2Symbol = "X";
    startGame();
});

function startGame() {
    playerChoiceModal.style.display = "none";
    gameContainer.style.display = "flex";
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        let tictactoeGrid = document.createElement("div");
        tictactoeGrid.classList.add("tictactoeBox");
        let gridId = `box${i}`;
        tictactoeGrid.setAttribute("id", gridId);
        board.appendChild(tictactoeGrid);
        tictactoeGrid.addEventListener("click", () => {
            addMove(gridId, i);
        });
    }
}

function addMove(element, boxNumber) {

    if (gameOver) return;

    moves++;
    let specificGrid = document.getElementById(element);

    if (!specificGrid.textContent) {
        if (playerTurn1) {
            specificGrid.textContent = player1Symbol;
            playerTurnElement.textContent = "Player 2's Turn";
        } else {
            specificGrid.textContent = player2Symbol;
            playerTurnElement.textContent = "Player 1's Turn";
        }
        playerTurn1 = !playerTurn1;
        updateBoard(specificGrid, boxNumber);
    }
}

function updateBoard(element, boxNumber) {

    let row = Math.floor(boxNumber / 3);
    let column = boxNumber % 3;
    gameBoard[row][column] = element.innerText;
    updateState(gameBoard);

}

function updateState(boardCopy) {

    const newBoard = JSON.parse(JSON.stringify(boardCopy));  // Deep copy
    state.push(newBoard);
    currentStateIndex = state.length - 1;  // Move to the latest state
    updateButtonVisibility();
    checkEndGame();

}

function checkEndGame() {

    function checkWin(symbol) {

        for (let i = 0; i < 3; i++) {

            if (
                (gameBoard[i][0] === symbol && gameBoard[i][1] === symbol && gameBoard[i][2] === symbol) ||
                (gameBoard[0][i] === symbol && gameBoard[1][i] === symbol && gameBoard[2][i] === symbol)
            ) {
                return true;
            }
        }
        return (
            (gameBoard[0][0] === symbol && gameBoard[1][1] === symbol && gameBoard[2][2] === symbol) ||
            (gameBoard[0][2] === symbol && gameBoard[1][1] === symbol && gameBoard[2][0] === symbol)
        );
    }

    if (checkWin(player1Symbol)) {

        playerTurnElement.textContent = "Player 1 Wins!";
        gameOver = true;
        document.getElementById("show").style.display = "block";
        return;

    }

    if (checkWin(player2Symbol)) {

        playerTurnElement.textContent = "Player 2 Wins!";
        gameOver = true;
        document.getElementById("show").style.display = "block";
        return;

    }

    if (moves === 9) {

        playerTurnElement.textContent = "It's a Draw!";
        document.getElementById("show").style.display = "block";
        gameOver = true;

    }
}

function reflectBoard(index) {

    let tempBoard = state[index];
    let moveString = [];

    for (let i = 0; i < tempBoard.length; i++) {

        for (let j = 0; j < tempBoard[i].length; j++) {

            moveString.push(tempBoard[i][j]);

        }

    }

    for (let grid = 0; grid < moveString.length; grid++) {

        document.getElementById(`box${grid}`).textContent = moveString[grid];

    }

    // Update the player turn display while navigating the history
    if (index % 2 === 0) {

        playerTurnElement.textContent = "Player 1's Turn";

    } else {

        playerTurnElement.textContent = "Player 2's Turn";

    }
}

// Handle Previous button: go back in history
prev.addEventListener("click", () => {

    if (currentStateIndex > 0) {
        currentStateIndex--;
        reflectBoard(currentStateIndex);
        updateButtonVisibility();
    }

});

// Handle Next button: go forward in history
next.addEventListener("click", () => {

    if (currentStateIndex < state.length - 1) {
        currentStateIndex++;
        reflectBoard(currentStateIndex);
        updateButtonVisibility();
    }
    
});
