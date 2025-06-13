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

    createRandom(difficulty = 1) {
        const entities = [];
        const blockCount = 5 + difficulty * 3;

        for (let i = 0; i < blockCount; i++) {
            entities.push(new Entity(
                "block.svg",
                Math.floor(Math.random() * CONST.MAP_WIDTH),
                Math.floor(Math.random() * CONST.MAP_HEIGHT),
                entityData.width || CONST.BLOCK_WIDTH,
                    entityData.height || CONST.BLOCK_HEIGHT
            ));
        }

        entities.push(new Entity(
            "entry.svg",
            Math.floor(Math.random() * 50),
            Math.floor(Math.random() * 50),
            entityData.width || CONST.BLOCK_WIDTH,
            entityData.height || CONST.BLOCK_HEIGHT
        ));

        entities.push(new Entity(
            "exit.svg",
            Math.floor(Math.random() * 50) + 70,
            Math.floor(Math.random() * 50) + 70,
            entityData.width || CONST.BLOCK_WIDTH,
            entityData.height || CONST.BLOCK_HEIGHT
        ));

        return entities;
    }
}