const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d")

// Create Unit
const box = 32;

// load Image
const ground = new Image();
ground.src = "./images/ground.png", "https://drive.google.com/uc?id=1sJNdNDejppac8j6aAvx9Z2RzQ_6kvA-Y";

const foodImg = new Image();
foodImg.src = "./images/food.png", "https://drive.google.com/uc?id=1HCI63V06W9DJmZZH_zUGFfM1oceFGNhs";

// Load Audio Files
const dead = new Audio();
const eat = new Audio();
const left = new Audio();
const up = new Audio();
const right = new Audio();
const down = new Audio();


dead.src = "./audio/dead.mp3", "https://drive.google.com/uc?id=1jRRhdsyWAWlsVyaKqmM3aFpNvJ_ZWjEA";
eat.src = "./audio/eat.mp3", "https://drive.google.com/uc?id=1Rh_2uOFbg-moffrQAuL7RuiAvvPTQrcN";
left.src = "./audio/left.mp3", "https://drive.google.com/uc?id=1Ot05UYCje7be1TyomeudLRFqZzjfb-Nf";
up.src = "./audio/up.mp3", "https://drive.google.com/uc?id=1296yk7HmHQOVEMFrVcqpNoOfZEv1aw1p";
right.src = "./audio/right.mp3", "https://drive.google.com/uc?id=1Kzhp6_YEs6iqp3rnfvu2QRwjnRkb9ZbX";
down.src = "./audio/down.mp3", "https://drive.google.com/uc?id=1ly6Z92dLlr4n_4H42vYbZNfLVmWititL";

// Create snake
let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// Create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// Create the Score
let score = 0;


// Control the Snake
let d;
document.addEventListener("keydown", direction);

function direction(e) {
    if (e.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
        // Play sound Effect
        left.play();
    } else if (e.keyCode == 38 && d != "DOWN") {
        d = "UP";
        // Play sound Effect
        up.play();
    } else if (e.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
        // Play sound Effect
        right.play();
    } else if (e.keyCode == 40 && d != "UP") {
        d = "DOWN";
        // Play sound Effect
        down.play();
    }
}

// Check Collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw Canvas
function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px 'Balsamiq Sans', cursive";
    ctx.fillText(score, 2 * box, 1.6 * box);
}
// call draw function every 100 ms

let game = setInterval(draw, 100);