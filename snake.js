const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
let box = 15;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = null;
let food = randomFood();
let score = 0;
let gameLoop = null;
document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});
function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}
function startSnake() {
  if (gameLoop) clearInterval(gameLoop);
  direction = null;
  snake = [{ x: 9 * box, y: 9 * box }];
  food = randomFood();
  score = 0;
  document.getElementById("snake-score").textContent = "Score: 0";
  gameLoop = setInterval(draw, 120);
}
function stopSnake() {
  clearInterval(gameLoop);
  gameLoop = null;
}
function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, box, box);
  ctx.fillStyle = "#00ff00";
  snake.forEach(part => { ctx.fillRect(part.x, part.y, box - 1, box - 1); });
  let head = { ...snake[0] };
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  head.x = (head.x + canvas.width) % canvas.width;
  head.y = (head.y + canvas.height) % canvas.height;
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      stopSnake();
      alert("Game Over! Score: " + score);
      return;
    }
  }
  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    food = randomFood();
    score++;
    document.getElementById("snake-score").textContent = "Score: " + score;
  } else {
    snake.pop();
    snake.unshift(head);
  }
}
