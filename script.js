let boxes = document.querySelectorAll('.box')
let newBtn = document.getElementById('new-game');
let resetBtn = document.getElementById('reset-game');
let winnerText = document.getElementById('winner');
let boxContainer = document.getElementById('box-container');
const clickAudio = new Audio("click.mp3");
const newResetAudio = new Audio("new-reset.mp3");
const winningAudio = new Audio("winning.mp3");
const drawAudio = new Audio("draw.mp3");

// Winning Patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

let turnO = true;
let count = 0;

// JS For Turns
boxes.forEach((box)=> {
    box.addEventListener("click", () => {
        clickAudio.play();
        if(turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner();

        let isWinner = checkWinner();
        if (count==9 && ! isWinner) {
            gameDraw();
        }
    })
})

// Check Winner JS
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);            
            }
        }
    }
}

// Show Winner JS
const showWinner = (pos1Val) => {
    winningAudio.play();
    winnerText.style.cssText = "display: flex; align-items: center; justify-content: center; background-color: rgb(36, 36, 36); border: none; border-radius: 10px; font-size: 1.5rem; font-weight: 900";
    winnerText.style.color = 'whitesmoke';
    winnerText.innerText = `And the winner is "${pos1Val}"`;

    boxContainer.style.display = 'none';
    resetBtn.style.display = 'none';
}

// New Game Button
const newGame = () => {
    newResetAudio.play();
    winnerText.style.display = 'none';
    boxContainer.style.display = 'flex';
    for (let box of boxes) {
        turnO= true;
        count = 0;
        box.disabled = false;
        box.innerText = "";
    }
    resetBtn.style.display = 'flex';
    resetBtn.style.alignItems = 'center';
    resetBtn.style.justifyContent = 'center';
}

newBtn.addEventListener("click", newGame);

// Reset Game Button
const resetGame = () => {
    newResetAudio.play();
    winnerText.style.display = 'none';
    boxContainer.style.display = 'flex';
    for (let box of boxes) {
        turnO= true;
        count = 0;
        box.disabled = false;
        box.innerText = "";
    }
}

resetBtn.addEventListener("click", resetGame);

const gameDraw = ()=> {
    drawAudio.play();
    boxContainer.style.display = 'none';
    winnerText.style.cssText = "display: flex; align-items: center; justify-content: center; background-color: rgb(36, 36, 36); border: none; border-radius: 10px; font-size: 1.5rem; font-weight: 900";
    winnerText.style.color = 'whitesmoke';
    winnerText.innerText = `Game Was A Draw`;
    resetBtn.style.display = 'none';
}