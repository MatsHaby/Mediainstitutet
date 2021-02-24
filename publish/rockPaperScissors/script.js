const playerOne = document.getElementById('imgp1');
const playerTwo = document.getElementById('imgp2');
const btnPlay = document.getElementById('play');
const selections = document.querySelectorAll('.selection__item');
const restart = document.getElementById('restart');
const playerScore = document.getElementById('scoreplayer');
const computerScore = document.getElementById('scorecomputer');
const playerOneDiv = document.getElementById('playerone');
const playerTwoDiv = document.getElementById('playertwo');

const images = ['rock', 'paper', 'scissor'];

let selectedHand;
let scoreForPlayer = 0;
let scoreForComputer = 0;

btnPlay.addEventListener('click', () => {
    restoreHands();
    removeClass();

    if (selectedHand) {
        toggleAnimation();
        setTimeout(() => {
            toggleAnimation();
            let playerHand = selectedHand;
            let computerHand = images[randomNumber()];

            playerOne.innerHTML = `<img src="img/${playerHand}.png">`;
            playerTwo.innerHTML = `<img src="img/${computerHand}.png">`;

            verifyWinner(playerHand, computerHand);
        }, 2100);
    } else {
        alert('you must select a hand');
    }
});

selections.forEach((selection) => {
    selection.addEventListener('click', selectHand);
});

restart.addEventListener('click', () => {
    location.reload();
});

function selectHand(e) {
    selections.forEach((selection) => {
        if (selection.classList.contains('selection__item--selected')) {
            selection.classList.remove('selection__item--selected');
        }
    });
    e.target.classList.add('selection__item--selected');
    selectedHand = e.target.alt;
}

function verifyWinner(playerHand, computerHand) {
    switch (playerHand + ' vs ' + computerHand) {
        case 'rock vs scissor':
            playerWins();
            break;
        case 'scissor vs rock':
            computerWins();
            break;
        case 'rock vs paper':
            computerWins();
            break;
        case 'paper vs rock':
            playerWins();
            break;
        case 'scissor vs paper':
            playerWins();
            break;
        case 'paper vs scissor':
            computerWins();
            break;
        case 'rock vs rock':
            tie();
            break;
        case 'scissor vs scissor':
            tie();
            break;
        case 'paper vs paper':
            tie();
            break;
    }
}

function restoreHands() {
    playerOne.innerHTML = `<img src="img/rock.png">`;
    playerTwo.innerHTML = `<img src="img/rock.png">`;
}

function playerWins() {
    scoreForPlayer++;
    playerScore.innerHTML = scoreForPlayer;
    playerOneDiv.classList.add('playerwon');
}
function computerWins() {
    scoreForComputer++;
    computerScore.innerHTML = scoreForComputer;
    playerTwoDiv.classList.add('playerwon');
}

function tie() {
    playerOneDiv.classList.add('tie');
    playerTwoDiv.classList.add('tie');
}

function removeClass() {
    playerOneDiv.classList.remove('tie', 'playerwon');
    playerTwoDiv.classList.remove('tie', 'playerwon');
}

function toggleAnimation() {
    playerOne.classList.toggle('animate');
    playerTwo.classList.toggle('animate');
}

function randomNumber() {
    return Math.floor(Math.random() * (2 - 0 + 1) + 0); //?
}
