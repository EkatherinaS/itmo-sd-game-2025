import * as CONST from '../constants.js';
import { Entity } from '../entities/entity.js';

export class Item extends Entity {
    constructor(sprite, x = 0, y = 0) {
        super(sprite, x, y, CONST.INFO_ITEM_WIDTH, CONST.INFO_ITEM_HEIGHT);
        this.count = 0;
    }
}
