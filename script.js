const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const resetButton = document.getElementById('reset-game');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Functions
function handleCellClick(event) {
    const cellIndex = parseInt(event.target.dataset.index);

    if (gameActive && gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer);
        checkWin();
        switchPlayer();
    }
}

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            gameActive = false;
            currentPlayerDisplay.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }

    // Check for a draw
    if (!gameBoard.includes('')) {
        gameActive = false;
        currentPlayerDisplay.textContent = "It's a draw!";
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}
