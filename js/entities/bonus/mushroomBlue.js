import * as CONST from '../../constants.js';
import { Bonus } from './bonus.js';

export class MushroomBlue extends Bonus {
    constructor(x, y) {
        const sprite = CONST.MUSHROOM_SPRITES.blue;
        super(sprite, x, y);
    }

    add(inventory) {
        inventory.addBlueMushroom();
    }
}
