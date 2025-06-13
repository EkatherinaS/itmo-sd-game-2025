import * as CONST from "./constants.js"
import { Renderer } from "./renderer.js"
import { EntityManager } from "./entityManager.js";
import { Controller } from "./controller.js";
import { Level } from "./level/level.js";


class Game {
    constructor(canvas) {
        const ctx = canvas.getContext('2d');
        this.loop = this.loop.bind(this);

        // this.level = new Level(); //тестовая заглушка
        this.level = new Level('random',  null,   10); //не больше 10; нормирование обрезанием по 10 зашита в функции генерации
        // this.level = new Level('fromJSON', "/itmo-sd-game-2025/levelMaps/levelFirst.json");
        this.entityManager = new EntityManager();
        this.renderer = new Renderer(ctx);
        this.controller = new Controller();
    }

    start() {
        const positionLookup = this.level.getPositionLookup();
        this.controller.setEventListeners(this.entityManager, positionLookup);
        this.loop();
    }

    loop() {
        const entities = this.entityManager.getAllEntities();
        const map = this.level.getEntities();
        this.renderer.renderEntities(entities);
        this.renderer.renderMap(map);
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
canvas.width = CONST.GAME_WIDTH * CONST.PIXEL_SIZE;
canvas.height = CONST.GAME_HEIGHT * CONST.PIXEL_SIZE;
const container = canvas.parentElement;

function resizeCanvas() {
    const scale = Math.min(
        container.clientWidth / canvas.width,
        container.clientHeight / canvas.height
    );
    canvas.style.width = `${canvas.width * scale}px`;
    canvas.style.height = `${canvas.height * scale}px`;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const game = new Game(canvas);
