import { Position } from "./position.js";
import { PositionInfo } from "./positionInfo.js";
import { PositionLookup } from "./positionLookup.js";
import * as CONST from "../constants.js";

export class LevelBase {
    constructor() {
        if (new.target === LevelBase) {
            throw new Error("LevelBase is abstract and cannot be instantiated");
        }
        this.entities = [];
    }

    async init() {
        throw new Error("Method 'init()' must be implemented");
    }

    getPositionLookup() {
        const lookup = new Map();

        this.entities.forEach(entity => {
            const x = entity.x;
            const y = entity.y;
            const width = entity.width || CONST.BLOCK_WIDTH;
            const height = entity.height || CONST.BLOCK_HEIGHT;

            let isSolid = false;
            let isEntry = false;
            let isExit = false;

            if (entity.type === 'block') {
                isSolid = true;
            } else if (entity.type === 'entry') {
                isEntry = true;
            } else if (entity.type === 'exit') {
                isExit = true;
            }

            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    const pos = new Position(x + i, y + j).toString();
                    lookup.set(pos, new PositionInfo(0, isEntry, isExit, isSolid));
                }
            }
        });

        return new PositionLookup(lookup);
    }

    getEntities() {
        return this.entities;
    }

    getEntryPosition() {
        const entry = this.entities.find(entity => entity.type === 'entry');
        return entry ? { x: entry.x, y: entry.y } : null;
    }
}