import * as CONST from '../constants.js';
import { Item } from './item.js';

export class HpItem extends Item {
    constructor(x, y) {
        const sprite = CONST.INFO_SPRITES.hp;
        super(sprite, x, y);
    }
}
