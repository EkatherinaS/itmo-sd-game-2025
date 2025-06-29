import * as CONST from '../constants.js';
import { Block } from '../entities/environment/block.js';
import { EntryPoint } from '../entities/environment/entryPoint.js';
import { ExitPoint } from '../entities/environment/exitPoint.js';
import { MushroomBlue } from '../entities/bonus/mushroomBlue.js';
import { MushroomGreen } from '../entities/bonus/mushroomGreen.js';
import { MushroomPurple } from '../entities/bonus/mushroomPurple.js';
import { Leech } from '../entities/enemy/leech.js';
import { Orb } from '../entities/enemy/orb.js';
import { Slug } from '../entities/enemy/slug.js';
import { Position } from './position.js';

export class MapBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.entities = [];
        this.difficulty = 1;
        this.width = CONST.GAME_WIDTH;
        this.height = CONST.GAME_HEIGHT;
        this.minSpacing = 2;
        this.maxAttempts = 100;
        this.blockCount = 5;
        this.enemyCount = 0;
        this.bonusCount = 0;
        this.entry = null;
        this.exit = null;
        this.playerLevel = 1;
        this.enemies = [];
        this.bonuses = [];

        this.enemySamples = {
            orb: new Orb(0, 0, this.playerLevel),
            slug: new Slug(0, 0, this.playerLevel),
            leech: new Leech(0, 0, this.playerLevel),
        };

        return this;
    }

    setDifficulty(difficulty) {
        this.difficulty = Math.min(Math.max(difficulty, 1), 10);
        this.blockCount = 5 + this.difficulty * 3;
        this.enemyCount = Math.max(2, Math.floor(this.difficulty * 0.8));
        this.bonusCount = Math.max(2, Math.floor(this.difficulty * 0.6));
        return this;
    }

    setPlayerLevel(playerLevel) {
        this.playerLevel = playerLevel;
        this.updateEnemySamples();
        return this;
    }

    updateEnemySamples() {
        this.enemySamples = {
            orb: new Orb(0, 0, this.playerLevel),
            slug: new Slug(0, 0, this.playerLevel),
            leech: new Leech(0, 0, this.playerLevel),
        };
    }

    setPlayer(player) {
        this.player = player;
        return this;
    }

    addEntryRandom() {
        this.entry = this.#placeSpecialEntity('entry');
        if (this.entry) this.entities.push(this.entry);
        return this;
    }

    addExitRandom() {
        this.exit = this.#placeSpecialEntity('exit', this.entry);
        if (this.exit) this.entities.push(this.exit);
        return this;
    }

    addBlocks() {
        for (let i = 0; i < this.blockCount; i++) {
            const block = this.#createBlock();
            if (block) this.entities.push(block);
        }
        return this;
    }

    addEnemies() {
        for (let i = 0; i < this.enemyCount; i++) {
            const enemy = this.#createEnemy();
            if (enemy) {
                this.entities.push(enemy);
            }
        }
        return this;
    }

    addBonuses() {
        for (let i = 0; i < this.bonusCount; i++) {
            const bonus = this.#createBonus();
            if (bonus) {
                this.entities.push(bonus);
            }
        }
        return this;
    }

    build() {
        const result = [...this.entities];
        this.reset();
        return result;
    }

    #placeSpecialEntity(type, avoidEntity = null) {
        let attempts = 0;
        let newEntity;
        let hasCollision;
        do {
            const x = Math.floor(
                Math.random() * (this.width - CONST.BLOCK_HEIGHT)
            );
            const y = Math.floor(
                Math.random() * (this.height - CONST.BLOCK_HEIGHT)
            );
            if (type === 'entry') {
                newEntity = new EntryPoint(x, y);
            } else if (type === 'exit') {
                newEntity = new ExitPoint(x, y);
            } else {
                return null;
            }
            hasCollision = this.#checkCollision(
                newEntity,
                this.entities,
                this.minSpacing
            );
            if (
                avoidEntity &&
                this.#distance(newEntity, avoidEntity) < this.width / 2
            ) {
                hasCollision = true;
            }
            attempts++;
            if (attempts >= this.maxAttempts) return null;
        } while (hasCollision);
        return newEntity;
    }

    #createBlock() {
        let attempts = 0;
        let newBlock;
        let hasCollision;
        do {
            const x = Math.floor(
                Math.random() * (this.width - CONST.BLOCK_WIDTH)
            );
            const y = Math.floor(
                Math.random() * (this.height - CONST.BLOCK_HEIGHT)
            );
            newBlock = new Block(x, y);
            hasCollision = this.#checkCollision(
                newBlock,
                this.entities,
                this.minSpacing
            );
            attempts++;
            if (attempts >= this.maxAttempts) return null;
        } while (hasCollision);
        return newBlock;
    }

    #createEnemy() {
        let attempts = 0;
        let newEnemy;
        let hasCollision;
        const safeDistance = 50;

        do {
            const x = Math.floor(
                Math.random() * (this.width - CONST.ENEMY_WIDTH)
            );
            const y = Math.floor(
                Math.random() * (this.height - CONST.ENEMY_HEIGHT)
            );

            const enemyTypes = [
                CONST.ENTITY_TYPE_LEECH,
                CONST.ENTITY_TYPE_ORB,
                CONST.ENTITY_TYPE_SLUG,
            ];
            const enemyType =
                enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

            switch (enemyType) {
                case CONST.ENTITY_TYPE_LEECH:
                    newEnemy = this.enemySamples.leech.clone();
                    newEnemy.x = x;
                    newEnemy.y = y;
                    break;
                case CONST.ENTITY_TYPE_ORB:
                    newEnemy = this.enemySamples.orb.clone();
                    newEnemy.x = x;
                    newEnemy.y = y;
                    break;
                case CONST.ENTITY_TYPE_SLUG:
                    newEnemy = this.enemySamples.slug.clone();
                    newEnemy.x = x;
                    newEnemy.y = y;
                    break;
                default:
                    newEnemy = this.enemySamples.leech.clone();
                    newEnemy.x = x;
                    newEnemy.y = y;
            }

            hasCollision = this.#checkCollision(
                newEnemy,
                this.entities,
                this.minSpacing
            );

            if (
                this.entry &&
                this.#distance(newEnemy, this.entry) < safeDistance
            ) {
                hasCollision = true;
            }
            if (
                this.exit &&
                this.#distance(newEnemy, this.exit) < safeDistance
            ) {
                hasCollision = true;
            }

            if (this.#checkBlockCollision(newEnemy)) {
                hasCollision = true;
            }

            attempts++;
            if (attempts >= this.maxAttempts) return null;
        } while (hasCollision);

        return newEnemy;
    }

    #createBonus() {
        let attempts = 0;
        let newBonus;
        let hasCollision;
        const safeDistance = 30;

        do {
            const x = Math.floor(
                Math.random() * (this.width - CONST.BONUS_WIDTH)
            );
            const y = Math.floor(
                Math.random() * (this.height - CONST.BONUS_HEIGHT)
            );

            const bonusTypes = ['blue', 'green', 'purple'];
            const bonusType =
                bonusTypes[Math.floor(Math.random() * bonusTypes.length)];

            switch (bonusType) {
                case 'blue':
                    newBonus = new MushroomBlue(x, y);
                    break;
                case 'green':
                    newBonus = new MushroomGreen(x, y);
                    break;
                case 'purple':
                    newBonus = new MushroomPurple(x, y);
                    break;
                default:
                    newBonus = new MushroomBlue(x, y);
            }

            hasCollision = this.#checkCollision(
                newBonus,
                this.entities,
                this.minSpacing
            );

            if (
                this.entry &&
                this.#distance(newBonus, this.entry) < safeDistance
            ) {
                hasCollision = true;
            }
            if (
                this.exit &&
                this.#distance(newBonus, this.exit) < safeDistance
            ) {
                hasCollision = true;
            }

            if (this.#checkBlockCollision(newBonus)) {
                hasCollision = true;
            }

            attempts++;
            if (attempts >= this.maxAttempts) return null;
        } while (hasCollision);

        return newBonus;
    }

    #checkBlockCollision(entity) {
        for (const existingEntity of this.entities) {
            if (existingEntity.constructor.name === CONST.ENTITY_CLASS_BLOCK) {
                const xCollision =
                    entity.x < existingEntity.x + existingEntity.width &&
                    entity.x + entity.width > existingEntity.x;
                const yCollision =
                    entity.y < existingEntity.y + existingEntity.height &&
                    entity.y + entity.height > existingEntity.y;
                if (xCollision && yCollision) {
                    return true;
                }
            }
        }
        return false;
    }

    #checkCollision(newEntity, existingEntities, minSpacing = 1) {
        for (const entity of existingEntities) {
            const xCollision =
                newEntity.x < entity.x + entity.width + minSpacing &&
                newEntity.x + newEntity.width + minSpacing > entity.x;
            const yCollision =
                newEntity.y < entity.y + entity.height + minSpacing &&
                newEntity.y + newEntity.height + minSpacing > entity.y;
            if (xCollision && yCollision) return true;
        }
        return false;
    }

    #distance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }
}
