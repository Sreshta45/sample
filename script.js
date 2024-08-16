const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');
const statusDisplay = document.getElementById('status');
const resultDisplay = document.getElementById('result');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'T'; // T for Tie
}

function handleClick(event) {
    if (!gameActive) return;

    const index = event.target.dataset.index;
    if (board[index] || !index) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        if (winner === 'T') {
            resultDisplay.textContent = 'It\'s a tie!';
        } else {
            resultDisplay.textContent = `${winner} wins!`;
        }
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    resultDisplay.textContent = '';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
