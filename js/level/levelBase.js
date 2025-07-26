import { Position } from './position.js';
import { PositionInfo } from './positionInfo.js';
import { PositionLookup } from './positionLookup.js';
import * as CONST from '../constants.js';

export class LevelBase {
    constructor() {
        if (new.target === LevelBase) {
            throw new Error('LevelBase is abstract and cannot be instantiated');
        }

        this.entry = null;
        this.exit = null;
        this.blocks = [];
        this.enemies = [];
        this.bonuses = [];
        this.entities = [];
    }

    async init() {
        throw new Error("Method 'init()' must be implemented");
    }

    getPositionLookup() {
        const lookup = new Map();

        this.entities.forEach(entity => {
            const x = Math.floor(entity.x);
            const y = Math.floor(entity.y);
            const width = entity.width || CONST.BLOCK_WIDTH;
            const height = entity.height || CONST.BLOCK_HEIGHT;

            const isSolid = !!entity.isSolid;
            const isEntry = !!entity.isEntry;
            const isExit = !!entity.isExit;

            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    const pos = new Position(x + i, y + j).toString();
                    lookup.set(
                        pos,
                        new PositionInfo(0, isEntry, isExit, isSolid)
                    );
                }
            }
        });

        return new PositionLookup(lookup);
    }

    getBlocks() {
        return this.entities.filter(
            entity => entity.constructor.name === CONST.ENTITY_CLASS_BLOCK
        );
    }

    getEntry() {
        return this.entities.find(entity => entity.isEntry);
    }

    getEntryCoords() {
        const entry = this.getEntry();
        return entry ? { x: entry.x, y: entry.y } : null;
    }

    getExit() {
        return this.entities.find(entity => entity.isExit);
    }

    getExitCoords() {
        const exit = this.getExit();
        return exit ? { x: exit.x, y: exit.y } : null;
    }
}
