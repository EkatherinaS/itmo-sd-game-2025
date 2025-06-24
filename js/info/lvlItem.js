import * as CONST from '../constants.js';
import { Item } from './item.js';

export class LvlItem extends Item {
    constructor(x, y) {
        const sprite = CONST.INFO_SPRITES.lvl;
        super(sprite, x, y);
    }
}
