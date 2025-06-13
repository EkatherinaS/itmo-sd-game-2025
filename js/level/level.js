import * as CONST from "../constants.js"

import { Entity } from "../entities/entity.js";
import { Position } from "./position.js";
import { PositionInfo } from "./positionInfo.js";
import { PositionLookup } from "./positionLookup.js";
import { MapFactory } from "./mapFactory.js";

export class Level {

    constructor(mapType = null, filePath = null, difficulty = 1) {
        this.mapFactory = new MapFactory();

        switch (mapType) {
            case "random":
                this.entities = this.mapFactory.createRandom(difficulty);
                break;
            case "fromJSON":
                this.mapFactory.createFromJSON(filePath || "/itmo-sd-game-2025/levelMaps/levelTest.json")
                .then(loadedEntities => {
                    this.entities = loadedEntities;
                    console.log('Entities loaded:', this.entities);
                })
                .catch(error => {
                    console.error('Loading failed, using test data:', error);
                    this.entities = this.mapFactory.getTestData();
                });
                break;
            case null:
                this.entities = this.mapFactory.getTestData();
                break;
            default:
                throw new Error(`Unknown map type: ${mapType}`);
        }
    }

    //Also placeholder data
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
}