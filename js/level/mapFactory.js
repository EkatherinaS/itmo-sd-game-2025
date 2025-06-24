import * as CONST from '../constants.js';
import { Entity } from '../entities/entity.js';
import { Block } from '../entities/environment/block.js';
import { EntryPoint } from '../entities/environment/entryPoint.js';
import { ExitPoint } from '../entities/environment/exitPoint.js';

export class MapFactory {
    async createFromJSON(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(
                    `Failed to load JSON: ${response.status} ${response.statusText}`
                );
            }
            const data = await response.json();
            return this.#parseJSONData(data);
        } catch (error) {
            console.error('Error loading JSON:', error);
            return this.getTestData();
        }
    }

    #parseJSONData(data) {
        const entities = [];

        if (!data.entities || !Array.isArray(data.entities)) {
            return entities;
        }

        data.entities.forEach(entityData => {
            let entity;

            switch (entityData.type) {
                case 'block':
                    entity = new Block(
                        entityData.x,
                        entityData.y,
                        entityData.width || CONST.BLOCK_WIDTH,
                        entityData.height || CONST.BLOCK_HEIGHT
                    );
                    break;

                case 'entry':
                    entity = new EntryPoint(
                        entityData.x,
                        entityData.y,
                        entityData.width || CONST.BLOCK_HEIGHT,
                        entityData.height || CONST.BLOCK_HEIGHT
                    );
                    break;

                case 'exit':
                    entity = new ExitPoint(
                        entityData.x,
                        entityData.y,
                        entityData.width || CONST.BLOCK_HEIGHT,
                        entityData.height || CONST.BLOCK_HEIGHT
                    );
                    break;

                case 'enemy':
                    entity = new Enemy(
                        entityData.image,
                        entityData.x,
                        entityData.y,
                        entityData.hp || 100,
                        entityData.attack || 10,
                        entityData.armor || 2
                    );
                    break;

                default:
                    console.warn(`Unknown entity type: ${entityData.type}`);
                    return;
            }

            if (entityData.customProps) {
                Object.assign(entity, entityData.customProps);
            }

            entities.push(entity);
        });

        return entities;
    }

    getTestData() {
        return [
            new Block(5, 5),
            new Block(70, 72),
            new Block(25, 42),

            new EntryPoint(20, 84),
            new ExitPoint(120, 100),

            new Block(30, 0),
            new Block(40, 0),
            new Block(40, 10),
            new Block(40, 20),
            new Block(40, 30),
            new Block(50, 0),

            new Block(70, 0),
            new Block(70, 10),
            new Block(80, 10),
            new Block(70, 20),
            new Block(70, 30),
            new Block(80, 0),
            new Block(80, 30),

            new Block(100, 0),
            new Block(100, 10),
            new Block(100, 20),
            new Block(100, 30),
            new Block(110, 0),
            new Block(110, 30),

            new Block(130, 0),
            new Block(140, 0),
            new Block(140, 10),
            new Block(140, 20),
            new Block(140, 30),
            new Block(150, 0),
        ];
    }

    #placeSpecialEntity(
        entities,
        image,
        xMin,
        xMax,
        yMin,
        yMax,
        maxAttempts = 100
    ) {
        let attempts = 0;
        let newEntity;
        let hasCollision;
        const minSpacing = 2;

        do {
            const x = Math.floor(
                Math.random() * (xMax - xMin - CONST.BLOCK_HEIGHT) + xMin
            );
            const y = Math.floor(
                Math.random() * (yMax - yMin - CONST.BLOCK_HEIGHT) + yMin
            );

            if (image.includes('entry')) {
                newEntity = new EntryPoint(x, y);
            } else if (image.includes('exit')) {
                newEntity = new ExitPoint(x, y);
            } else {
                console.error(`Unknown special entity image: ${image}`);
                return null;
            }

            hasCollision = this.#checkCollision(
                newEntity,
                entities,
                minSpacing
            );
            attempts++;

            if (attempts >= maxAttempts) {
                console.error(
                    `Не удалось разместить ${image} после ${maxAttempts} попыток`
                );
                return null;
            }
        } while (hasCollision);

        return newEntity;
    }

    #checkCollision(newEntity, existingEntities, minSpacing = 1) {
        for (const entity of existingEntities) {
            const xCollision =
                newEntity.x < entity.x + entity.width + minSpacing &&
                newEntity.x + newEntity.width + minSpacing > entity.x;

            const yCollision =
                newEntity.y < entity.y + entity.height + minSpacing &&
                newEntity.y + newEntity.height + minSpacing > entity.y;

            if (xCollision && yCollision) {
                return true;
            }
        }
        return false;
    }

    createRandom(difficulty = 1) {
        difficulty = Math.min(difficulty, 10);
        const entities = [];
        const minSpacing = 2;
        const minEntryExitDistanceX = CONST.GAME_WIDTH / 2;
        const minEntryExitDistanceY = CONST.GAME_HEIGHT / 2;

        const maxGlobalAttempts = 3;
        let globalAttempts = 0;
        let success = false;

        while (!success && globalAttempts < maxGlobalAttempts) {
            try {
                let entry, exit;
                let placementAttempts = 0;
                const maxPlacementAttempts = 50;

                do {
                    if (entry) entities.pop();
                    if (exit) entities.pop();

                    const entryX = Math.floor(
                        minSpacing +
                            Math.random() *
                                (CONST.GAME_WIDTH -
                                    CONST.BLOCK_HEIGHT -
                                    minSpacing * 2)
                    );
                    const entryY = Math.floor(
                        minSpacing +
                            Math.random() *
                                (CONST.GAME_HEIGHT -
                                    CONST.BLOCK_HEIGHT -
                                    minSpacing * 2)
                    );

                    const exitX = Math.floor(
                        Math.random() * (CONST.GAME_WIDTH - CONST.BLOCK_HEIGHT)
                    );
                    const exitY = Math.floor(
                        Math.random() * (CONST.GAME_HEIGHT - CONST.BLOCK_HEIGHT)
                    );

                    entry = new EntryPoint(entryX, entryY);
                    exit = new ExitPoint(exitX, exitY);

                    placementAttempts++;

                    if (placementAttempts >= maxPlacementAttempts) {
                        throw new Error('Не удалось разместить вход и выход');
                    }
                } while (
                    Math.abs(entry.x - exit.x) < minEntryExitDistanceX ||
                    Math.abs(entry.y - exit.y) < minEntryExitDistanceY ||
                    this.#checkCollision(entry, entities, minSpacing) ||
                    this.#checkCollision(exit, entities, minSpacing)
                );

                entities.push(entry, exit);
                success = true;
            } catch (error) {
                console.warn(
                    `Попытка ${globalAttempts + 1} не удалась: ${error.message}`
                );
                entities.length = 0;
                globalAttempts++;
            }
        }

        if (!success) {
            throw new Error(
                `Не удалось создать уровень после ${maxGlobalAttempts} попыток`
            );
        }

        const blockCount = 5 + difficulty * 3;
        const maxBlockAttempts = 100;

        for (let i = 0; i < blockCount; i++) {
            let newBlock;
            let hasCollision;
            let blockAttempts = 0;

            do {
                const x = Math.floor(
                    Math.random() * (CONST.GAME_WIDTH - CONST.BLOCK_WIDTH)
                );
                const y = Math.floor(
                    Math.random() * (CONST.GAME_HEIGHT - CONST.BLOCK_HEIGHT)
                );

                newBlock = new Block(x, y);
                hasCollision = this.#checkCollision(
                    newBlock,
                    entities,
                    minSpacing
                );
                blockAttempts++;

                if (blockAttempts >= maxBlockAttempts) {
                    console.warn('Не удалось разместить блок');
                    break;
                }
            } while (hasCollision);

            if (!hasCollision) {
                entities.push(newBlock);
            }
        }

        return entities;
    }
}
