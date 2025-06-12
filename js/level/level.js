import * as CONST from "../constants.js"

import { Entity } from "../entities/entity.js";
import { GameMap } from "./gameMap.js";
import { Position } from "./position.js";
import { PositionInfo } from "./positionInfo.js";
import { PositionLookup } from "./positionLookup.js";


export class Level {

    constructor() {
        //this.mapFactory = new MapFactory();
        //this.map = this.mapFactory.createMap();
        this.entities = this.#getTestData();
    }

    //Placeholder data 
    #getTestData() {
        const entities = []
        entities.push(new Entity("block.svg", 5, 5, CONST.BLOCK_WIDTH, CONST.BLOCK_HEIGHT));
        entities.push(new Entity("block.svg", 70, 72, CONST.BLOCK_WIDTH, CONST.BLOCK_HEIGHT));
        entities.push(new Entity("block.svg", 25, 32, CONST.BLOCK_WIDTH, CONST.BLOCK_HEIGHT));
        entities.push(new Entity("entry.svg", 20, 84, CONST.BLOCK_HEIGHT, CONST.BLOCK_HEIGHT));
        entities.push(new Entity("exit.svg", 120, 100, CONST.BLOCK_HEIGHT, CONST.BLOCK_HEIGHT));
        return entities;
    }

    //Also placeholder data
    getPositionLookup() {
        var lookup = new Map();
        for (let i = 0; i < CONST.BLOCK_WIDTH; i++) {
            for (let j = 0; j < CONST.BLOCK_HEIGHT; j++) {
                lookup.set((new Position(5 + i, 5 + j)).toString(), new PositionInfo(0, false, false, true));
                lookup.set((new Position(70 + i, 72 + j)).toString(), new PositionInfo(0, false, false, true));
                lookup.set((new Position(25 + i, 32 + j)).toString(), new PositionInfo(0, false, false, true));
                lookup.set((new Position(20 + i, 84 + j)).toString(), new PositionInfo(0, true, false, false));
                lookup.set((new Position(96 + i, 110 + j)).toString(), new PositionInfo(0, false, true, false));
            }
        }
        return new PositionLookup(lookup);
    }

    getEntities() {
        return this.entities;
    }

    getMap() {
        return new GameMap();
    }
}