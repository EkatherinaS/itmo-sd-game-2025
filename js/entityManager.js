import { Leech } from './entities/enemy/leech.js';
import { Orb } from './entities/enemy/orb.js';
import { Slug } from './entities/enemy/slug.js';
import { MushroomGreen } from './entities/bonus/mushroomGreen.js';
import { MushroomBlue } from './entities/bonus/mushroomBlue.js';
import { MushroomPurple } from './entities/bonus/mushroomPurple.js';
import { Player } from './entities/player/player.js';
import { Inventory } from './info/inventory.js';
import { Experience } from './info/experience.js';

export class EntityManager {
    constructor() {
        this.player = new Player();
        this.inventory = new Inventory();
        this.experience = new Experience(this.player);
        this.bonuses = [];
        this.enemies = [];
        this.isExitOpen = false;
    }

    getPlayer() {
        return this.player;
    }

    getMovableEntities() {
        return this.player
            .getEntities()
            .concat(this.enemies)
            .concat(this.bonuses);
    }

    #setEntities(map) {
        map.enemies.forEach(enemy => {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    this.enemies.push(
                        new Orb(enemy.x, enemy.y, this.player.lvl)
                    );
                    break;
                case 1:
                    this.enemies.push(
                        new Slug(enemy.x, enemy.y, this.player.lvl)
                    );
                    break;
                default:
                    this.enemies.push(
                        new Leech(enemy.x, enemy.y, this.player.lvl)
                    );
            }
        });
        map.bonuses.forEach(bonus => {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    this.bonuses.push(new MushroomGreen(bonus.x, bonus.y));
                    break;
                case 1:
                    this.bonuses.push(new MushroomBlue(bonus.x, bonus.y));
                    break;
                default:
                    this.bonuses.push(new MushroomPurple(bonus.x, bonus.y));
            }
        });
    }

    setLevelInfo(level) {
        this.positionLookup = level.getPositionLookup();
        this.exit = level.getExit();
        this.#setEntities(level);
    }

    moveAll() {
        this.enemies.forEach(enemy => {
            enemy.move(this.positionLookup, this.player);
        });
    }

    checkCollide() {
        this.enemies.forEach(enemy => {
            const hit = enemy.fight(this.player, this.positionLookup);
            if (hit) this.experience.updateHp();
        });
        this.enemies = this.enemies.filter(enemy => {
            if (!enemy.isAlive()) {
                this.experience.addExp(2);
            }
            return enemy.isAlive();
        });

        this.bonuses.forEach(bonus => {
            if (bonus.check(this.player, this.positionLookup)) {
                bonus.add(this.inventory);
                this.experience.addExp(1);
            }
        });
        this.bonuses = this.bonuses.filter(bonus => bonus.isAlive());
    }

    getInventory() {
        return this.inventory;
    }

    getExperience() {
        return this.experience;
    }

    isEndGame() {
        return !this.player.isAlive();
    }

    isLevelPassed() {
        return this.enemies.length == 0;
    }

    isExitCollide() {
        return this.positionLookup.checkCollide(this.player, this.exit);
    }
}
