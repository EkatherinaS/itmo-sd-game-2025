import * as CONST from '../../constants.js';
import { Bonus } from './bonus.js';

export class MushroomGreen extends Bonus {
    constructor(x, y) {
        const sprite = CONST.MUSHROOM_SPRITES.green;
        super(sprite, x, y);
    }

    add(inventory) {
        inventory.addGreenMushroom();
    }
}
