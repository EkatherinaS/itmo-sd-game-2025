import { Renderer } from './renderer.js';
import { EntityManager } from './entityManager.js';
import { Controller } from './controller.js';
import { Level } from './level/level.js';
import * as CONST from './constants.js';

export class Game {
    constructor(canvas, info) {
        const ctx = canvas.getContext('2d');
        const ctxInfo = info.getContext('2d');

        this.loop = this.loop.bind(this);
        this.level = Level.create(
            CONST.LEVEL_TYPES_RANDOM,
            null,
            CONST.GAME_DIFFICULTY
        );

        this.entityManager = new EntityManager();
        this.renderer = new Renderer(ctx, ctxInfo);
        this.controller = new Controller();

        this.isRunning = false;
        this.levelComplete = false;
    }

    async run() {
        if (this.isRunning) return;

        this.isRunning = true;
        while (!this.entityManager.isEndGame() && this.isRunning) {
            this.levelComplete = false;
            await this.initLevel();
            await this.runLevel();
        }
    }

    async initLevel() {
        await this.level.init();

        this.entityManager.setLevelInfo(this.level);
        this.controller.setEventListeners(
            this.entityManager,
            this.level.getPositionLookup()
        );

        const entry = this.level.getEntry();
        const spawnX = entry
            ? entry.x
            : Math.floor(CONST.GAME_WIDTH / CONST.STEP / 2) * CONST.STEP;
        const spawnY = entry
            ? entry.y
            : Math.floor(CONST.GAME_HEIGHT / CONST.STEP / 2) * CONST.STEP;

        this.entityManager.setPlayerCoords(spawnX, spawnY);
    }

    async runLevel() {
        return new Promise(resolve => {
            const gameLoop = () => {
                if (this.levelComplete || !this.isRunning) {
                    resolve();
                    return;
                }
                this.loop();
                requestAnimationFrame(gameLoop);
            };
            gameLoop();
        });
    }

    loop() {
        if (this.entityManager.isEndGame()) {
            this.isRunning = false;
        }

        this.controller.update();
        this.entityManager.moveAll();
        this.entityManager.checkCollide();

        const inventory = this.entityManager.getInventory();
        const experience = this.entityManager.getExperience();
        const moving = this.entityManager.getMovableEntities();
        const blocks = this.level.getBlocks();
        const entry = this.level.getEntry();
        let entities = blocks.concat([entry]).concat(moving);

        if (this.entityManager.isLevelPassed()) {
            const exit = this.level.getExit();
            entities = entities.concat([exit]);

            if (this.entityManager.isExitCollide()) {
                this.levelComplete = true;
            }
        }

        this.renderer.renderEntities(entities);
        this.renderer.renderInfo(inventory.getItems(), experience.getItems());
    }
}
