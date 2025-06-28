import * as CONST from '../../constants.js';
import { Block } from '../../entities/environment/block.js';
import { EntryPoint } from '../../entities/environment/entryPoint.js';
import { ExitPoint } from '../../entities/environment/exitPoint.js';
import { AbstractMapFactory } from './abstractMapFactory.js';

export class TestMapFactory extends AbstractMapFactory {
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

    createMap() {
        return [
            this.createBlock(5, 5),
            this.createBlock(70, 72),
            this.createBlock(25, 42),

            this.createEntryPoint(20, 84),
            this.createExitPoint(120, 100),

            this.createBlock(30, 0),
            this.createBlock(40, 0),
            this.createBlock(40, 10),
            this.createBlock(40, 20),
            this.createBlock(40, 30),
            this.createBlock(50, 0),

            this.createBlock(70, 0),
            this.createBlock(70, 10),
            this.createBlock(80, 10),
            this.createBlock(70, 20),
            this.createBlock(70, 30),
            this.createBlock(80, 0),
            this.createBlock(80, 30),

            this.createBlock(100, 0),
            this.createBlock(100, 10),
            this.createBlock(100, 20),
            this.createBlock(100, 30),
            this.createBlock(110, 0),
            this.createBlock(110, 30),

            this.createBlock(130, 0),
            this.createBlock(140, 0),
            this.createBlock(140, 10),
            this.createBlock(140, 20),
            this.createBlock(140, 30),
            this.createBlock(150, 0),
        ];
    }
}
