import { Player } from "./player.js";

export class EntityManager {
    constructor() {
        this.player = new Player();
        this.enemies = [];
    }

    getPlayer() {
        return this.player;
    }

    getEnemy(ind = 0) {
        if (ind > 0 && this.enemies.length > ind) {
            return this.enemies[ind];
        } else {
            return NaN;
        }
    }

    getAllEntities() {
        const allEntities = this.enemies.concat([this.player]);
        return allEntities;
    }
}