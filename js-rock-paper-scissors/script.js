// Variables to catch all HTML DOM objects
// Scores and results
const player_score      = document.getElementById("playerScore");
const computer_score    = document.getElementById("computerScore"); 
const result            = document.getElementById("result");

// Buttons
const ROCK      = document.getElementById("rock");
const PAPER     = document.getElementById("paper");
const SCISSORS  = document.getElementById("scissors");

// Variables to store scores
var p_score = 0, c_score = 0;

function choiceDisplay (choice) {
    if (choice === "r") {
        return "ROCK";
    }
    if (choice === "p") {
        return "PAPER";
    }
    if (choice === "s") {
        return "SCISSORS";
    }
}

function playerWin (p,c) {
    p_score += 1;
    player_score.innerHTML = p_score;
    result.innerHTML = "You rolled " + choiceDisplay(p) + "! Computer rolled " + choiceDisplay(c) + "! You Won!";
    result.style.color = "white";
    result.style.backgroundColor = "darkgreen";
}

function playerLose (p,c) {
    c_score += 1;
    computer_score.innerHTML = c_score;
    result.innerHTML = "You rolled " + choiceDisplay(p) + "! Computer rolled " + choiceDisplay(c) + "! You Lose!";
    result.style.color = "white";
    result.style.backgroundColor = "darkred";
}

function gameDraw (p,c) {
    result.innerHTML = "You rolled " + choiceDisplay(p) + "! Computer rolled " + choiceDisplay(c) + "! It's a Draw!";
    result.style.color = "white";
    result.style.backgroundColor = "dimgrey";
}

function computerChoice () {
    const choice = ['r','p','s'];
    const randNum = Math.floor(Math.random() * 3);
    return choice[randNum];
}

function checkWin (player,computer) {
    switch (player + computer) {
        // Win conditions
        case "rs":
        case "pr":
        case "sp":
            playerWin(player,computer);
            break;

        // Lose conditions
        case "rp":
        case "ps":
        case "sr":
            playerLose(player,computer);
            break;

        // Draw conditions
        case "rr":
        case "pp":
        case "ss":
            gameDraw(player,computer);
            break;

        default:
            console.log("UNDEFINED ERROR");
            break;
    }
}

function gameRun () {
    ROCK.addEventListener('click', function () {
        checkWin('r', computerChoice());
    });

    PAPER.addEventListener('click', function () {
        checkWin('p', computerChoice());
    });

    SCISSORS.addEventListener('click', function () {
        checkWin('s', computerChoice());
    });
}

gameRun();