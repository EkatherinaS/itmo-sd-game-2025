import * as CONST from '../../constants.js';
import { Light } from './light.js';

export class GreenLight extends Light {
    constructor(x, y) {
        const sprite = CONST.LIGHT_SPRITES.green;
        super(sprite, x, y);

        this.power = 1;
    }
}
