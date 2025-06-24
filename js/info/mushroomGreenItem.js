import * as CONST from '../constants.js';
import { Item } from './item.js';

export class MushroomGreenItem extends Item {
    constructor(x, y) {
        const sprite = CONST.MUSHROOM_SPRITES.green;
        super(sprite, x, y);
    }
}
