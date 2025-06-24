import { Environment } from './environment.js';
import * as CONST from '../../constants.js';

export class EntryPoint extends Environment {
    constructor(x, y) {
        super('entry.svg', x, y, CONST.BLOCK_HEIGHT, CONST.BLOCK_HEIGHT);
        this.isEntry = true;
    }
}
