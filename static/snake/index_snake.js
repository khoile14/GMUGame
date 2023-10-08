
const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightgreen";
const snakeColor = "royalblue";
const snakeBorder = "black";
const appleColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let appleX;
let appleY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
window.addEventListener("keydown", displayGameOver);
resetButton.addEventListener("click", resetGame);

gameStart();


function gameStart() {
    running = true;
    scoreText.textContent = score;
    createApple();
    drawApple();
    nextTick();
};

function nextTick() {
    if (running) {
        setTimeout(()=>{
            clearBoard();
            drawApple();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
};

function clearBoard() {
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
};

function createApple() {
    function randomApple(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }

    appleX = randomApple(0, gameWidth - unitSize);
    appleY = randomApple(0, gameWidth - unitSize);
};

function drawApple() {
    context.fillStyle = appleColor;
    context.fillRect(appleX, appleY, unitSize, unitSize);
};

function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    if (snake[0].x == appleX && snake[0].y == appleY) {
        score += 1;
        scoreText.textContent = score;
        createApple();
    }   
    else {
        snake.pop();
    }           
};

function drawSnake() {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFTARROW = 37;
    const UPARROW = 38;
    const RIGHTARROW = 39;
    const DOWNARROW = 40;

    const LEFT_CHAR_A = 65;
    const UP_CHAR_W = 87;
    const RIGHT_CHAR_D = 68;
    const DOWN_CHAR_S = 83;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true) {
        case((keyPressed == LEFTARROW || keyPressed == LEFT_CHAR_A) && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case((keyPressed == UPARROW || keyPressed == UP_CHAR_W) && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case((keyPressed == RIGHTARROW || keyPressed == RIGHT_CHAR_D) && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case((keyPressed == DOWNARROW || keyPressed == DOWN_CHAR_S) && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};

function checkGameOver() {
    switch(true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
                running = false;
                break;
        case (snake[0].y >= gameHeight):
                running = false;
                break;
    }

    for(let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            running = false;
    }
};

function displayGameOver(event) {

    if (running) {
        return ;
    }

    context.font = "50px MV Boli";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;

    const keyPressed = event.keyCode;
    const CHAR_R = 82;
    const ENTER_BUTTTON = 13;

    if (keyPressed == CHAR_R || keyPressed == ENTER_BUTTTON)
        resetGame();
    
};

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;

    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];

    gameStart();
};
