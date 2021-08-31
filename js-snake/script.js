const canvas    = document.getElementById("canvas");
const scoreDisp = document.getElementById("scoreBoard");
const ctx       = canvas.getContext("2d");

// Game variables
var gameSpeed = 750;        // Change this to affect how quickly the snake moves
var scale = 20;             // Controls snake and fruit width/height, also makes snake move this length per loop
var speed = {x : 0, y : 0}; // Snake speed
var score = 0;              // Game score
var direction = "";         // Keep track of current direction (U, D, R and L)

// Snake variables
var snake = [{
    x : 0,
    y : 0
}];                         // We initialize the snake array with one element
var snakeColor = "white";

// Fruit variables
var fruit = {x : 0, y : 0}; // Initialize the fruit variable
var fruitColor = "yellow";

function runGame () {
    speed.x = scale;
    fruit.x = Math.floor(Math.random() * scale) * scale;
    fruit.y = Math.floor(Math.random() * scale) * scale;
    setInterval(moveSnake,gameSpeed);
}

function drawGame () {
    placeFruit();
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : snakeColor;
        ctx.fillRect(snake[i].x,snake[i].y,scale,scale);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);
    }
    
    snake.unshift(head);
    snake.pop();
}

function moveSnake () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (snake[0].x < 0) {
        snake[0].x = canvas.width;
    }
    if (snake[0].x > canvas.width) {
        snake[0].x = -scale;
    }
    if (snake[0].y < 0) {
        snake[0].y = canvas.height;
    }
    if (snake[0].y > canvas.height) {
        snake[0].y = -scale;
    }
    snake[0].x += speed.x;
    snake[0].y += speed.y;
    eatFood();
    checkCollision();
    drawGame();
}

function changeDirection (code) {
    switch (code) {
        case "ArrowUp":
            if (direction === "D") {
                return;
            }
            speed.y = -scale;
            speed.x = 0;
            direction = "U";
            break;

        case "ArrowDown":
            if (direction === "U") {
                return;
            }
            speed.y = scale;
            speed.x = 0;
            direction = "D";
            break;

        case "ArrowLeft":
            if (direction === "R") {
                return;
            }
            speed.x = -scale;
            speed.y = 0;
            direction = "L";
            break;

        case "ArrowRight":
            if (direction === "L") {
                return;
            }
            speed.x = scale;
            speed.y = 0;
            direction = "R";
            break;

        default:
            break;
    }
}

function placeFruit () {
    ctx.fillStyle = fruitColor;
    ctx.fillRect(fruit.x,fruit.y,scale,scale);
    ctx.strokeStyle = "black";
    ctx.strokeRect(fruit.x,fruit.y,scale,scale);
}

function eatFood () {
    if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
        score++;
        snake.push({
            x : fruit.x,
            y : fruit.y
        });
        fruit.x = Math.floor(Math.random() * scale) * scale;
        fruit.y = Math.floor(Math.random() * scale) * scale;
        scoreDisp.innerHTML = score;
    }
}

function checkCollision () {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            console.log("collided");
        }
    }
    //score = 0;
}

window.addEventListener('keydown', (e) => {
    changeDirection(e.code);
})

window.onload = runGame();