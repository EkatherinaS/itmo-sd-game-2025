import * as CONST from './constants.js';
import { Game } from './game.js';

function startGame() {
    startBtn.hidden = true;
    audioPlayer.play();
    game.start();
}

function resizeCanvas() {
    const scale = Math.min(
        container.clientWidth / canvas.width,
        container.clientHeight / (canvas.height + info.height)
    );

    canvas.style.width = `${canvas.width * scale}px`;
    canvas.style.height = `${canvas.height * scale}px`;

    info.style.width = `${info.width * scale}px`;
    info.style.height = `${info.height * scale}px`;
}

const startBtn = document.getElementById('startButton');
startBtn.addEventListener('click', startGame);

const audioPlayer = document.getElementById('audioPlayer');
audioPlayer.volume = 0.1;

const container = document.getElementById('layout');

const canvas = document.getElementById('gameCanvas');
canvas.width = CONST.GAME_WIDTH * CONST.PIXEL_SIZE;
canvas.height = CONST.GAME_HEIGHT * CONST.PIXEL_SIZE;

const info = document.getElementById('infoCanvas');
info.width = CONST.GAME_WIDTH * CONST.PIXEL_SIZE;
info.height = CONST.INFO_ITEM_HEIGHT * CONST.PIXEL_SIZE;

const game = new Game(canvas, info);

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
