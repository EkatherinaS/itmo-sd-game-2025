import * as CONST from '../../constants.js';
import { Light } from './light.js';

export class BlueLight extends Light {
    constructor(x, y) {
        const sprite = CONST.LIGHT_SPRITES.blue;
        super(sprite, x, y);

        this.armor = 7;
        this.power = 7;
        this.duration = 5000;
    }
}
