import * as CONST from '../../constants.js';
import { Block } from '../../entities/environment/block.js';
import { EntryPoint } from '../../entities/environment/entryPoint.js';
import { ExitPoint } from '../../entities/environment/exitPoint.js';
import { AbstractMapFactory } from './abstractMapFactory.js';

export class JSONMapFactory extends AbstractMapFactory {
    constructor() {
        super();
    }

    createBlock(x, y, width = CONST.BLOCK_WIDTH, height = CONST.BLOCK_HEIGHT) {
        return new Block(x, y, width, height);
    }

    createEntryPoint(
        x,
        y,
        width = CONST.BLOCK_HEIGHT,
        height = CONST.BLOCK_HEIGHT
    ) {
        return new EntryPoint(x, y, width, height);
    }

    createExitPoint(
        x,
        y,
        width = CONST.BLOCK_HEIGHT,
        height = CONST.BLOCK_HEIGHT
    ) {
        return new ExitPoint(x, y, width, height);
    }

    async createMap(filePath) {
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
            return [];
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
                    entity = this.createBlock(
                        entityData.x,
                        entityData.y,
                        entityData.width,
                        entityData.height
                    );
                    break;

                case 'entry':
                    entity = this.createEntryPoint(
                        entityData.x,
                        entityData.y,
                        entityData.width,
                        entityData.height
                    );
                    break;

                case 'exit':
                    entity = this.createExitPoint(
                        entityData.x,
                        entityData.y,
                        entityData.width,
                        entityData.height
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
}
