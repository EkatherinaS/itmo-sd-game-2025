import { Player } from './entities/player/player.js';
import { Inventory } from './info/inventory.js';
import { Experience } from './info/experience.js';
import * as CONST from './constants.js';

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

    setPlayerCoords(x, y) {
        this.player.setCoords(x, y);
    }

    getMovableEntities() {
        return this.player
            .getEntities()
            .concat(this.enemies)
            .concat(this.bonuses);
    }

    setLevelInfo(level) {
        this.positionLookup = level.getPositionLookup();
        this.exit = level.getExit();

        this.enemies = [];
        this.bonuses = [];

        if (level.entities) {
            this.enemies = level.entities.filter(entity => {
                return (
                    entity.constructor.name === CONST.ENTITY_CLASS_ORB ||
                    entity.constructor.name === CONST.ENTITY_CLASS_SLUG ||
                    entity.constructor.name === CONST.ENTITY_CLASS_LEECH
                );
            });

            this.bonuses = level.entities.filter(entity => {
                return (
                    entity.constructor.name ===
                        CONST.ENTITY_CLASS_MUSHROOM_GREEN ||
                    entity.constructor.name ===
                        CONST.ENTITY_CLASS_MUSHROOM_BLUE ||
                    entity.constructor.name ===
                        CONST.ENTITY_CLASS_MUSHROOM_PURPLE
                );
            });
        }
    }

    moveAll() {
        this.enemies.forEach(enemy => {
            enemy.move(this.positionLookup, this.player);
        });
    }

    checkCollide() {
        this.enemies.forEach(enemy => {
            const hit = this.player.fight(enemy, this.positionLookup);
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

    getInventoryItems() {
        return this.inventory.getItems();
    }

    getExperience() {
        return this.experience;
    }

    getExperienceItems() {
        return this.experience.getItems();
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

    getPlayerLevel() {
        return this.player.lvl;
    }
}
