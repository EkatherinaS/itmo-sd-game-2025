import * as CONST from "./constants.js"
import { Renderer } from "./renderer.js"
import { EntityManager } from "./entityManager.js";
import { Controller } from "./controller.js";
import { ImageLoader } from "./imageLoader.js";


class Game {
    constructor(element) {
        element.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
        this.loop = this.loop.bind(this);

        this.entityManager = new EntityManager();
        this.renderer = new Renderer(this.ctx, this.entityManager);
        this.controller = new Controller(this.entityManager);
        this.loader = new ImageLoader();
    }

    start() {
        this.loop();
    }

    loop() {
        this.renderer.renderAll();
        requestAnimationFrame(this.loop);
    }
}

function startGame() {
    audioPlayer.play();
    startBtn.hidden = true;
    game.start();
}

const startBtn = document.getElementById("startButton");
startBtn.addEventListener('click', startGame);

const audioPlayer = document.getElementById("audioPlayer");
audioPlayer.volume = 0.1;

const canvas = document.getElementById("gameCanvas");
canvas.width = CONST.GAME_WIDTH;
canvas.height = CONST.GAME_HEIGHT;

const game = new Game(document.getElementById('game'));
