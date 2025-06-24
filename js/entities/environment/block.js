import { Environment } from './environment.js';
import * as CONST from '../../constants.js';

export class Block extends Environment {
    constructor(x, y) {
        super('block.svg', x, y, CONST.BLOCK_WIDTH, CONST.BLOCK_HEIGHT);
        this.isSolid = true;
    }
}