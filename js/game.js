import * as CONST from "./constants.js"
import { Renderer } from "./renderer.js"
import { EntityManager } from "./entityManager.js";
import { Controller } from "./controller.js";


class Game {
    constructor(element) {
        element.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        this.loop = this.loop.bind(this);

        this.entityManager = new EntityManager();
        this.renderer = new Renderer(ctx);
        this.controller = new Controller();
    }

    start() {
        const player = this.entityManager.getPlayer();
        this.controller.setEventListeners(player);
        this.loop();
    }

    loop() {
        const entities = this.entityManager.getAllEntities();
        this.renderer.renderAll(entities);
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

const game = new Game(document.getElementById('game'));
