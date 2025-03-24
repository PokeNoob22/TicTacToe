let board = document.getElementById("board");
let prev = document.getElementById("prev");

let gameBoard = [
  // 0   1   2  
    ['', '', ''],
  // 3   4   5
    ['', '', ''],
  // 6   7   8
    ['', '', '']
]

let state = [];

let moves = 0;

let playerTurn1 = true;

function createBoard(){
    for(let i = 0; i < 9; i++){
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

function addMove(element, boxNumber){
    moves++;
    let specificGrid = document.getElementById(element);
    // if grid is empty
    if(!specificGrid.textContent){
        if(playerTurn1){
            specificGrid.textContent = "X";
            playerTurn1 = false;
        } else {
            specificGrid.textContent = "O";
            playerTurn1 = true;
        }
    }
    updateBoard(specificGrid, boxNumber);
}

// let gameBoard = [
//     // 0   1   2  
//       ['', '', ''],
//     // 3   4   5
//       ['', '', ''],
//     // 6   7   8
//       ['', '', '']
//   ]

function updateBoard(element, boxNumber){
    // 8
    // gameBoard[2][2]
    // row
    // Math.floor(8/3) = 2
    // column
    // 8%3 = 2

    // 4
    // gameboard[1][1]
    // row
    // Math.floor(4/3) = 1
    // column
    // 4%3 = 1

    // 6
    // gameBoard[2][0]
    // Match.floor(6/3) = 2
    // 6%3 = 0

    let row = Math.floor(boxNumber/3);
    let column = boxNumber%3;
    gameBoard[row][column] = element.innerText;
    // console.log(gameBoard);
    updateState(gameBoard);
}

function updateState(boardCopy){
    const newBoard = [];
    for(let i = 0; i<boardCopy.length; i++){
        const row = [];
        for(let j = 0; j<boardCopy[i].length; j++){
            row.push(boardCopy[i][j]);
        }
        newBoard.push(row);
    }

    state.push(newBoard);
    console.log(state);
    checkEndGame();
}

function checkEndGame(){
    // check winning combination
    if(moves === 9){
        document.getElementById("show").style.display = "block";
    }
}

function reflectBoard(index){
    let tempBoard = state[index];
    let moveString = [];
    for(let i = 0; i<tempBoard.length; i++){
        for(let j = 0; j<tempBoard[i].length; j++){
            moveString.push(tempBoard[i][j]);
        }
    }

    for(let grid = 0; grid < moveString.length; grid++){
        document.getElementById(`box${grid}`).textContent = moveString[grid];
    }
}

prev.addEventListener("click", () => reflectBoard(1));

createBoard();
