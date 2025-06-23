import * as CONST from '../../constants.js';
import { Light } from './light.js';

export class PinkLight extends Light {
    constructor(x, y) {
        const sprite = CONST.LIGHT_SPRITES.pink;
        super(sprite, x, y);

        this.power = 2;
    }
}
