import { Leech } from './entities/enemy/leech.js';
import { Orb } from './entities/enemy/orb.js';
import { Slug } from './entities/enemy/slug.js';
import { Player } from './entities/player/player.js';

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

    setEntities(map) {
        map.enemies.forEach(enemy => {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    this.enemies.push(new Orb(enemy.x, enemy.y));
                    break;
                case 1:
                    this.enemies.push(new Slug(enemy.x, enemy.y));
                    break;
                default:
                    this.enemies.push(new Leech(enemy.x, enemy.y));
            }
        });
    }

    setPositionLookup(positionLookup) {
        this.positionLookup = positionLookup;
    }

    moveAll() {
        this.enemies.forEach(enemy => {
            enemy.move(this.positionLookup, this.player);
        });
    }
}
