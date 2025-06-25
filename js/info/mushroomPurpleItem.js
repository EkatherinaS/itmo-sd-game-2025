import * as CONST from '../constants.js';
import { Item } from './item.js';

export class MushroomPurpleItem extends Item {
    constructor(x, y) {
        const sprite = CONST.MUSHROOM_SPRITES.purple;
        super(sprite, x, y);
    }
}
