import * as CONST from '../../constants.js';
import { Light } from './light.js';

export class YellowLight extends Light {
    constructor(x, y) {
        const sprite = CONST.LIGHT_SPRITES.yellow;
        super(sprite, x, y);

        this.armor = 0;
        this.power = 0;
        this.duration = 0;
    }
}
