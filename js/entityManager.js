import { Leech } from './entities/enemy/leech.js';
import { Orb } from './entities/enemy/orb.js';
import { Slug } from './entities/enemy/slug.js';
import { MushroomGreen } from './entities/item/mushroomGreen.js';
import { MushroomPink } from './entities/item/mushroomPink.js';
import { MushroomYellow } from './entities/item/mushroomYellow.js';
import { Player } from './entities/player/player.js';

export class EntityManager {
    constructor() {
        this.player = new Player();
        this.bonuses = [];
        this.enemies = [];
    }

    getPlayer() {
        return this.player;
    }

    getAllEntities() {
        return this.player
            .getEntities()
            .concat(this.enemies)
            .concat(this.bonuses);
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
        map.bonuses.forEach(bonus => {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    this.bonuses.push(new MushroomGreen(bonus.x, bonus.y));
                    break;
                case 1:
                    this.bonuses.push(new MushroomPink(bonus.x, bonus.y));
                    break;
                default:
                    this.bonuses.push(new MushroomYellow(bonus.x, bonus.y));
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

    checkCollide() {
        this.enemies.forEach(enemy => {
            enemy.fight(this.player);
        });
        this.bonuses.forEach(bonus => {
            bonus.check(this.player);
        });
        this.enemies = this.enemies.filter(enemy => enemy.isAlive());
        this.bonuses = this.bonuses.filter(bonus => bonus.isAlive());
    }

    checkEndGame() {
        return this.player.isAlive();
    }
}
