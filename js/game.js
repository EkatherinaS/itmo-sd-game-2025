import * as CONST from "./constants.js"
import { Renderer } from "./renderer.js"
import { EntityManager } from "./entityManager.js";
import { Controller } from "./controller.js";


class Game {
    constructor(canvas) {
        const ctx = canvas.getContext('2d');
        const entityManager = new EntityManager();

        this.loop = this.loop.bind(this);
        this.renderer = new Renderer(ctx, entityManager);
        this.controller = new Controller(entityManager);
    }

    start() {
        this.controller.setEventListeners();
        this.loop();
    }

    loop() {
        this.renderer.renderAll();
        requestAnimationFrame(this.loop);
    }
}

function startGame() {
    startBtn.hidden = true;
    audioPlayer.play();
    game.start();
}

const startBtn = document.getElementById("startButton");
startBtn.addEventListener('click', startGame);

const audioPlayer = document.getElementById("audioPlayer");
audioPlayer.volume = 0.1;

const canvas = document.getElementById("gameCanvas");
canvas.width = CONST.GAME_WIDTH;
canvas.height = CONST.GAME_HEIGHT;

const game = new Game(canvas);
