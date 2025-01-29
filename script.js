const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 16; // Size of each grid cell
let snake = [{ x: 160, y: 160 }]; // Initial snake position
let food = {};
let direction = 'right';
let score = 0;
let gameOverFlag = false; // Changed to gameOverFlag to avoid naming conflict

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
        y: Math.floor(Math.random() * (canvas.height / grid)) * grid
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0)? 'green': 'red';
        ctx.fillRect(snake[i].x, snake[i].y, grid, grid);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid, grid);
}

function update() {
    if (gameOverFlag) {
        alert('Game Over!');
        return;
    }

    const head = { x: snake.x, y: snake.y };
    switch (direction) {
        case 'up': head.y -= grid; break;
        case 'down': head.y += grid; break;
        case 'left': head.x -= grid; break;
        case 'right': head.x += grid; break;
    }

    // Check for game over conditions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head, snake)) {
        gameOverFlag = true;
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

    draw();
}

function checkCollision(head, array) {
    for (let i = 1; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': if (direction!== 'down') direction = 'up'; break;
        case 'ArrowDown': if (direction!== 'up') direction = 'down'; break;
        case 'ArrowLeft': if (direction!== 'right') direction = 'left'; break;
        case 'ArrowRight': if (direction!== 'left') direction = 'right'; break;
    }
});

generateFood();
setInterval(update, 100); // Game speed
