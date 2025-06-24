import * as CONST from './constants.js';
import { Game } from './game.js';

function startGame() {
    startBtn.hidden = true;
    audioPlayer.play();
    game.start();
}

const startBtn = document.getElementById('startButton');
startBtn.addEventListener('click', startGame);

const audioPlayer = document.getElementById('audioPlayer');
audioPlayer.volume = 0.1;

const gameCanvas = document.getElementById('gameCanvas');
const infoCanvas = document.getElementById('infoCanvas');

const barLeft = document.getElementById('bar-left');
const BarRight = document.getElementById('bar-right');

gameCanvas.width = CONST.GAME_WIDTH * CONST.PIXEL_SIZE;
gameCanvas.height = CONST.GAME_HEIGHT * CONST.PIXEL_SIZE;
infoCanvas.width = CONST.GAME_WIDTH * CONST.PIXEL_SIZE;
infoCanvas.height = CONST.INFO_ITEM_HEIGHT * CONST.PIXEL_SIZE;

barLeft.height =
    (CONST.GAME_HEIGHT + CONST.INFO_ITEM_HEIGHT) * CONST.PIXEL_SIZE;
BarRight.height =
    (CONST.GAME_HEIGHT + CONST.INFO_ITEM_HEIGHT) * CONST.PIXEL_SIZE;

const game = new Game(gameCanvas, infoCanvas);

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
