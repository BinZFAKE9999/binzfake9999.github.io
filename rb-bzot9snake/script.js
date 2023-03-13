// Set up the canvas
alert("Game is ready! Let's enjoy BZOT9 Snake!");
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Set up the game variables
let snake = [{x: 10, y: 10}];
let food = {};
let direction = "right";
let score = 0;
let speed = 5;
let gameLoop;

// Set up the key listener
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (e.code === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (e.code === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (e.code === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Set up the restart button listener
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", () => {
  clearInterval(gameLoop);
  startGame();
});

// Set up the speed range listener
const speedRange = document.getElementById("speed-range");
speedRange.addEventListener("input", () => {
  speed = parseInt(speedRange.value);
  clearInterval(gameLoop);
  gameLoop = setInterval(updateGame, 1000 / speed);
});

// Set up the start game function
function startGame() {
  snake = [{x: 10, y: 10}];
  food = {};
  direction = "right";
  score = 0;
  speed = parseInt(speedRange.value);

  // Generate the first food
  generateFood();

  // Start the game loop
  gameLoop = setInterval(updateGame, 1000 / speed);
}

// Set up the update game function
function updateGame() {
  // Move the snake
  moveSnake();

  // Check for collisions
  if (checkCollisions()) {
    clearInterval(gameLoop);
    alert("Game over");
    return;
  }

  // Check for food
  if (checkFood()) {
    generateFood();
    score++;
    document.getElementById("score").textContent = score;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  drawSnake();

  // Draw the food
  drawFood();
}

// Set up the move snake function
function moveSnake() {
  // Remove the tail
  snake.pop();

  // Add a new head
  let newHead;
  if (direction === "up") {
    newHead = {x: snake[0].x, y: snake[0].y - 1};
  } else if (direction === "down") {
    newHead = {x: snake[0].x, y: snake[0].y + 1};
  } else if (direction === "left") {
    newHead = {x: snake[0].x - 1, y: snake[0].y};
  } else if (direction === "right") {
    newHead = {x: snake[0].x + 1, y: snake[0].y};
  }
  snake.unshift(newHead);
}

// Set up the check collisions function
function checkCollisions() {
  // Check for wall collision
  if (snake[0].y < 0 || snake[0].y >= canvas.height / 10) {
return true;
}

// Check for self collision
for (let i = 1; i < snake.length; i++) {
if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
return true;
}
}

return false;
}

// Set up the check food function
function checkFood() {
if (snake[0].x === food.x && snake[0].y === food.y) {
return true;
}
return false;
}

// Set up the generate food function
function generateFood() {
// Generate a random location for the food
let x = Math.floor(Math.random() * (canvas.width / 10));
let y = Math.floor(Math.random() * (canvas.height / 10));

// Check if the location is already occupied by the snake
for (let i = 0; i < snake.length; i++) {
if (x === snake[i].x && y === snake[i].y) {
// If it is, generate a new location
return generateFood();
}
}

// Set the location of the food
food = {x, y};
}

// Set up the draw snake function
function drawSnake() {
ctx.fillStyle = "#FFFFFF";
for (let i = 0; i < snake.length; i++) {
ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
}
}

// Set up the draw food function
function drawFood() {
ctx.fillStyle = "#FF0000";
ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

// Start the game
startGame();
