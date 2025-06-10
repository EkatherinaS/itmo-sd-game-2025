import { Player } from "./entities/player/player.js";

export class EntityManager {
    constructor() {
        this.player = new Player();
        this.enemies = [];
    }

    getPlayer() {
        return this.player;
    }

    getAllEntities() {
        const allEntities = this.enemies.concat([this.player]);
        return allEntities;
    }
}