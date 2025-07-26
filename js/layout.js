import * as CONST from './constants.js';
import { Game } from './game.js';

let currentGame = null; // Track current game instance

async function startGame() {
    startBtn.hidden = true;
    if (currentGame) {
        currentGame = null;
    }

    currentGame = new Game(gameCanvas, infoCanvas);
    audioPlayer.currentTime = 0;
    await audioPlayer.play().catch(e => console.warn('Audio error:', e));
    await currentGame.run();

    startBtn.hidden = false;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

// Rest of your setup code remains the same...

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
