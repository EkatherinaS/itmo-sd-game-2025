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
        this.enemySamples = {
            orb: new Orb(0, 0, this.player.lvl),
            slug: new Slug(0, 0, this.player.lvl),
            leech: new Leech(0, 0, this.player.lvl),
        };
        this.bonuses = [];
        this.enemies = [];
        this.isExitOpen = false;
    }

    getPlayer() {
        return this.player;
    }

    setPlayerCoords(x, y) {
        this.player.setCoords(x, y);
    }

    getMovableEntities() {
        return this.player
            .getEntities()
            .concat(this.enemies)
            .concat(this.bonuses);
    }

    #setEntities(map) {
        if (map.entities) {
            map.entities.forEach(entity => {
                if (
                    entity instanceof Orb ||
                    entity instanceof Slug ||
                    entity instanceof Leech
                ) {
                    this.enemies.push(entity);
                } else if (
                    entity instanceof MushroomGreen ||
                    entity instanceof MushroomBlue ||
                    entity instanceof MushroomPurple
                ) {
                    this.bonuses.push(entity);
                }
            });
        }

        if (map.enemies) {
            map.enemies.forEach(enemy => {
                switch (Math.floor(Math.random() * 3)) {
                    case 0:
                        const orbClone = this.enemySamples.orb.clone();
                        orbClone.x = enemy.x;
                        orbClone.y = enemy.y;
                        this.enemies.push(orbClone);
                        break;
                    case 1:
                        const slugClone = this.enemySamples.slug.clone();
                        slugClone.x = enemy.x;
                        slugClone.y = enemy.y;
                        this.enemies.push(slugClone);
                        break;
                    default:
                        const leechClone = this.enemySamples.leech.clone();
                        leechClone.x = enemy.x;
                        leechClone.y = enemy.y;
                        this.enemies.push(leechClone);
                }
            });
        }

        if (map.bonuses) {
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
    }

    setLevelInfo(level) {
        this.positionLookup = level.getPositionLookup();
        this.exit = level.getExit();
        this.enemySamples = {
            orb: new Orb(0, 0, this.player.lvl),
            slug: new Slug(0, 0, this.player.lvl),
            leech: new Leech(0, 0, this.player.lvl),
        };
        this.#setEntities(level);
    }

    moveAll() {
        this.enemies.forEach(enemy => {
            enemy.update(this.positionLookup, this.player);
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
