const canvas = document.querySelector(".game-canvas");
const container = document.querySelector(".game-container");

const GAME_WIDTH = 352;
const GAME_HEIGHT = 198;

container.style.width = `${GAME_WIDTH}px`;
container.style.height = `${GAME_HEIGHT}px`;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const newScale = Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT) - 1;
container.style.transform = `scale(${newScale}) translateY(50%)`;


const overworld = new Overworld({
  element: container
});
overworld.init();