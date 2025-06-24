import { Renderer } from './renderer.js';
import { EntityManager } from './entityManager.js';
import { Controller } from './controller.js';
import { Level } from './level/level.js';

export class Game {
    constructor(canvas, info) {
        const ctx = canvas.getContext('2d');
        const ctxInfo = info.getContext('2d');

        this.loop = this.loop.bind(this);

        this.level = new Level();
        this.entityManager = new EntityManager();
        this.renderer = new Renderer(ctx, ctxInfo);
        this.controller = new Controller();
    }

    start() {
        const positionLookup = this.level.getPositionLookup();
        const map = this.level.getMap();
        this.entityManager.setEntities(map);
        this.entityManager.setPositionLookup(positionLookup);
        this.controller.setEventListeners(this.entityManager, positionLookup);
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
