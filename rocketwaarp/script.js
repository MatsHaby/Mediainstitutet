const gamebox = document.getElementById("gamebox");
const startgame = document.getElementById("startgame");

let started;
let down = 0;
let left = 0;
let time;
let hitt = "";
let obstaclePosRight = 0;
let obstaclePosBot = 0;

let audioBlowUp = document.createElement("audio");
audioBlowUp.setAttribute("src", "sounds/blowUp.wav");

let audioGameOver = document.createElement("audio");
audioGameOver.setAttribute("src", "sounds/gameover.mp3");

let audioStartGame = document.createElement("audio");
audioStartGame.setAttribute("src", "sounds/gra3cp.mp3");

// insert rocket
gamebox.insertAdjacentHTML(
    "afterbegin",
    "<div class='character' id='character'></div>"
);

const character = document.getElementById("character");

gamebox.insertAdjacentHTML(
    "afterbegin",
    "<div class='obstacle' id='obstacle'></div>"
);

const obstacle = document.getElementById("obstacle");

startgame.addEventListener("click", startGame);

// When pressing start game, start the timer and music
function startGame() {
    timer(); // start timer
    music(); // start background music

    // if the game isn't started, start game. else change to restart button
    if (!started) {
        // load the ships controllers
        document.addEventListener("keydown", moveShip);

        // Creating stones and check if it hits the ship
        setInterval(function () {
            // how many px the meteorite should move each interval
            obstaclePosRight += 2;
            obstacle.style.right = obstaclePosRight + "px";

            // get the position of the ship and meteorite
            let characterPos = character.getBoundingClientRect();
            let stonePos = obstacle.getBoundingClientRect();


            // formula to check if the ship and meteorite collide
            if (
                characterPos.top + characterPos.height > stonePos.top &&
                characterPos.left + characterPos.width > stonePos.left &&
                characterPos.bottom - characterPos.height < stonePos.bottom &&
                characterPos.right - characterPos.width < stonePos.right
            ) {
                // if ship gets hit
                if (!hitt) {
                    hitt = "hitt";
                    
                    // change image to blow up ship
                    character.style.backgroundImage = "url('img/bomb.png')";

                    // play blow up sound & game over music
                    audioBlowUp.play();
                    audioGameOver.play();

                    // stop timer, stop playing music and remove controls and add glow to restart-button
                    stopTimer();
                    audioStartGame.pause();
                    document.removeEventListener("keydown", moveShip);
                    startgame.classList.add("restart");
                }
            }
            /*
             if meteorite is outside the gamebox, then make the meteorite
             go back and come again at a diffrent location and size
            */
            if (obstaclePosRight >= 480) {
                obstaclePosRight = 0;

                // Random höjd mellan 0 och 200
                let randomHeight = Math.floor(
                    Math.random() * (150 - 0 + 1) + 0
                );
                let randomWidth = Math.floor(
                    Math.random() * (50 - 10 + 1) + 10
                );
                obstaclePosBot = randomHeight;
                obstacle.style.bottom = obstaclePosBot + "px";
                obstacle.style.height = randomWidth + "px";
                obstacle.style.width = randomWidth + "px";
            }
        }, 5);
        started = "yes";
        startgame.innerText = "Restart";
    } else {
        location.reload();
    }
}

// Controls for the ship
function moveShip(evt) {
    switch (evt.key) {
        case "ArrowLeft":
            if (left == 0) {
                break;
            }
            left -= 10;
            character.style.left = left + "px";
            break;
        case "ArrowRight":
            if (left == 470) {
                break;
            }
            left += 10;
            character.style.left = left + "px";
            break;
        case "ArrowDown":
            if (down == 0) {
                break;
            }
            down -= 10;
            character.style.bottom = down + "px";
            break;
        case "ArrowUp":
            if (down == 170) {
                break;
            }
            down += 10;
            character.style.bottom = down + "px";
            break;
    }
}

// Background music playing
function music() {
    audioStartGame.play();
    audioStartGame.loop = true;
}

// Timer

function stopTimer() {
    console.log("stop!");
    clearInterval(time);
}

function timer() {
    const timer = document.getElementById("timer");
    let seconds = 0;
    let minutes = 0;

    time = setInterval(() => {
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        timer.innerHTML = `${minutes}:${seconds}`;
    }, 1000);
}
