import { Renderer } from './renderer.js';
import { EntityManager } from './entityManager.js';
import { Controller } from './controller.js';
import { Level } from './level/level.js';

export class Game {
    constructor(canvas, info) {
        const ctx = canvas.getContext('2d');
        const ctxInfo = info.getContext('2d');

        this.loop = this.loop.bind(this);

        // this.level = Level.create(CONST.LEVEL_TYPES_TEST);
        // this.level = Level.create(CONST.LEVEL_TYPES_RANDOM, null, 10);
        this.level = Level.create(
            CONST.LEVEL_TYPES_FROM_JSON,
            '/itmo-sd-game-2025/levelMaps/levelFirst.json'
        );

        this.entityManager = new EntityManager();
        this.renderer = new Renderer(ctx, ctxInfo);
        this.controller = new Controller();
    }

    async start() {
        await this.level.init();

        const positionLookup = this.level.getPositionLookup();
        const map = this.level.getMap();
        this.entityManager.setEntities(map);
        this.entityManager.setPositionLookup(positionLookup);
        this.controller.setEventListeners(this.entityManager, positionLookup);
        const entryPos = this.level.getEntryPosition();
        const spawnX = entryPos
            ? entryPos.x - 4
            : Math.floor(CONST.GAME_WIDTH / CONST.STEP / 2) * CONST.STEP;
        const spawnY = entryPos
            ? entryPos.y - 5
            : Math.floor(CONST.GAME_HEIGHT / CONST.STEP / 2) * CONST.STEP;

        this.entityManager.getPlayer().setCoords(spawnX, spawnY);
        this.loop();
    }

    loop() {
        this.entityManager.moveAll();
        this.entityManager.checkCollide();
        //this.entityManager.checkEndGame();
        //his.entityManager.checkNextLevel();

        const inventory = this.entityManager.getInventory();
        const experience = this.entityManager.getExperience();
        const entities = this.entityManager.getAllEntities();
        const map = this.level.getEntities();

        this.renderer.renderEntities(entities);
        this.renderer.renderInfo(inventory.getItems(), experience.getItems());
        this.renderer.renderMap(map);

        requestAnimationFrame(this.loop);
    }
}
