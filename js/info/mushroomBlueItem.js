import * as CONST from '../constants.js';
import { Item } from './item.js';

export class MushroomBlueItem extends Item {
    constructor(x, y) {
        const sprite = CONST.MUSHROOM_SPRITES.blue;
        super(sprite, x, y);
    }
}
