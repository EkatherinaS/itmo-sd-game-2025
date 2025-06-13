import * as CONST from "../constants.js";
import { Entity } from "../entities/entity.js";

export class MapFactory {
    async createFromJSON(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load JSON: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return this.#parseJSONData(data);
        } catch (error) {
            console.error("Error loading JSON:", error);
            return this.getTestData();
        }
    }

    #parseJSONData(data) {
        const entities = [];
        if (data.entities && Array.isArray(data.entities)) {
            data.entities.forEach(entityData => {
                const entity = new Entity(
                    entityData.image,
                    entityData.x,
                    entityData.y,
                    entityData.width || CONST.BLOCK_WIDTH,
                    entityData.height || CONST.BLOCK_HEIGHT
                );
                entity.type = entityData.type;
                entities.push(entity);
            });
        }
        return entities;
    }

    //Placeholder data
    getTestData() {
        const entities = []
        entities.push(new Entity("block.svg", 5, 5, CONST.BLOCK_WIDTH, CONST.BLOCK_HEIGHT, "block"));
        entities.push(new Entity("block.svg", 70, 72, CONST.BLOCK_WIDTH, CONST.BLOCK_HEIGHT, "block"));
        entities.push(new Entity("block.svg", 25, 32, CONST.BLOCK_WIDTH, CONST.BLOCK_HEIGHT, "block"));
        entities.push(new Entity("entry.svg", 20, 84, CONST.BLOCK_HEIGHT, CONST.BLOCK_HEIGHT, "entry"));
        entities.push(new Entity("exit.svg", 120, 100, CONST.BLOCK_HEIGHT, CONST.BLOCK_HEIGHT, "exit"));
        return entities;
    }

    #placeSpecialEntity(entities, image, xMin, xMax, yMin, yMax, maxAttempts = 100) {
        let attempts = 0;
        let newEntity;
        let hasCollision;
        const minSpacing = 2;

        do {
            newEntity = new Entity(
                image,
                Math.floor(Math.random() * (xMax - xMin - CONST.BLOCK_HEIGHT) + xMin),
                Math.floor(Math.random() * (yMax - yMin - CONST.BLOCK_HEIGHT) + yMin),
                CONST.BLOCK_HEIGHT,
                CONST.BLOCK_HEIGHT,
                image.includes('entry') ? 'entry' : 'exit'
            );

            hasCollision = this.#checkCollision(newEntity, entities, minSpacing);
            attempts++;

            if (attempts >= maxAttempts) {
                console.error(`Не удалось разместить ${image} после максимального количества попыток`);
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
        const entities = [];
        const blockCount = 5 + difficulty * 3;
        const maxAttempts = 100;
        const minSpacing = 2;

        for (let i = 0; i < blockCount; i++) {
            let attempts = 0;
            let newEntity;
            let hasCollision;

            do {
                newEntity = new Entity(
                    "block.svg",
                    Math.floor(Math.random() * (CONST.GAME_WIDTH - CONST.BLOCK_WIDTH)),
                    Math.floor(Math.random() * (CONST.GAME_HEIGHT - CONST.BLOCK_HEIGHT)),
                    CONST.BLOCK_WIDTH,
                    CONST.BLOCK_HEIGHT,
                    "block"
                );

                hasCollision = this.#checkCollision(newEntity, entities, minSpacing);
                attempts++;

                if (attempts >= maxAttempts) {
                    console.warn("Не удалось разместить блок после максимального количества попыток");
                    break;
                }
            } while (hasCollision);

            if (attempts < maxAttempts) {
                entities.push(newEntity);
            }
        }

        const entry = this.#placeSpecialEntity(entities, "entry.svg", 0, 50, 0, 50);
        if (entry) entities.push(entry);

        const exit = this.#placeSpecialEntity(entities, "exit.svg", 70, 120, 70, 120);
        if (exit) entities.push(exit);

        return entities;
    }
}