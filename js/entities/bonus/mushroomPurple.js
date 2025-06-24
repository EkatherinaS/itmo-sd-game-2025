import * as CONST from '../../constants.js';
import { Bonus } from './bonus.js';

export class MushroomPurple extends Bonus {
    constructor(x, y) {
        const sprite = CONST.MUSHROOM_SPRITES.purple;
        super(sprite, x, y);
    }

    add(inventory) {
        inventory.addYellowMushroom();
    }
}
