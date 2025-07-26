import * as CONST from '../constants.js';
import { Item } from './item.js';

export class ExpItem extends Item {
    constructor(x, y) {
        const sprite = CONST.INFO_SPRITES.exp;
        super(sprite, x, y);
    }
}
