import * as CONST from '../../constants.js';
import { Block } from '../../entities/environment/block.js';
import { EntryPoint } from '../../entities/environment/entryPoint.js';
import { ExitPoint } from '../../entities/environment/exitPoint.js';
import { MapBuilder } from '../mapBuilder.js';
import { AbstractMapFactory } from './abstractMapFactory.js';

export class RandomMapFactory extends AbstractMapFactory {
    constructor() {
        super();
        this.mapBuilder = new MapBuilder();
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

    createMap(difficulty = 1) {
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
