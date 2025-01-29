const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height;

const snakeSize = 10;
let snake = [{ x: gameWidth / 2, y: gameHeight / 2 }];
let dx = snakeSize;
let dy = 0;
let foodX, foodY;
let score = 0;
let gameOverFlag = false;

function generateFood() {
  foodX = Math.floor(Math.random() * (gameWidth / snakeSize)) * snakeSize;
  foodY = Math.floor(Math.random() * (gameHeight / snakeSize)) * snakeSize;
}

generateFood();

function drawGame() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    ctx.strokeRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

function checkCollision() {
  if (snake.x < 0 || snake.x >= gameWidth || snake.y < 0 || snake.y >= gameHeight) {
    gameOver();
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake.x === snake[i].x && snake.y === snake[i].y) {
      gameOver();
      return true;
    }
  }

  return false;
}

function gameOver() {
  clearInterval(gameLoopInterval);
  alert('Game Over!');
  gameOverFlag = true;
}

function moveSnake() {
  if (!gameOverFlag) {
    const head = { x: snake.x + dx, y: snake.y + dy };
    snake.unshift(head);

    if (!checkCollision()) {
      if (head.x === foodX && head.y === foodY) {
        score++;
        generateFood();
      } else {
        snake.pop();
      }

      drawGame();
    }
  }
}

function handleKeyPress(event) {
  if (!gameOverFlag) {
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;

    const goingUp = dy === -snakeSize;
    const goingDown = dy === snakeSize;
    const goingRight = dx === snakeSize;
    const goingLeft = dx === -snakeSize;

    if (keyPressed === LEFT_KEY &&!goingRight) {
      dx = -snakeSize;
      dy = 0;
    } else if (keyPressed === UP_KEY &&!goingDown) {
      dx = 0;
      dy = -snakeSize;
    } else if (keyPressed === RIGHT_KEY &&!goingLeft) {
      dx = snakeSize;
      dy = 0;
    } else if (keyPressed === DOWN_KEY &&!goingUp) {
      dx = 0;
      dy = snakeSize;
    }
  } else {
    resetGame();
  }
}

function resetGame() {
  clearInterval(gameLoopInterval);
  snake = [{ x: gameWidth / 2, y: gameHeight / 2 }];
  dx = snakeSize;
  dy = 0;
  score = 0;
  gameOverFlag = false;
  generateFood();
  gameLoop();
}

let gameLoopInterval;

function gameLoop() {
  gameLoopInterval = setInterval(moveSnake, 100);
}

window.addEventListener('keydown', handleKeyPress);
gameLoop();
