import * as CONST from '../constants.js';
import { Entity } from '../entities/entity.js';
import { Block } from '../entities/environment/block.js';
import { EntryPoint } from '../entities/environment/entryPoint.js';
import { ExitPoint } from '../entities/environment/exitPoint.js';
import { MapBuilder } from './mapBuilder.js';

export class MapFactory {
    constructor() {
        this.mapBuilder = new MapBuilder();
    }

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

                default:
                    // Unknown entity type
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

    createRandom(difficulty = 1) {
        return this.mapBuilder
            .setDifficulty(difficulty)
            .setPlayerLevel(1)
            .addEntryRandom()
            .addExitRandom()
            .addBlocks()
            .addEnemies()
            .addBonuses()
            .build();
    }
}
