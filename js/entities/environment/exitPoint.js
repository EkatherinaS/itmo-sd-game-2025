import { Environment } from './environment.js';
import * as CONST from '../../constants.js';

export class ExitPoint extends Environment {
    constructor(x, y) {
        super('exit.svg', x, y, CONST.BLOCK_HEIGHT, CONST.BLOCK_HEIGHT);
        this.isExit = true;
    }
}