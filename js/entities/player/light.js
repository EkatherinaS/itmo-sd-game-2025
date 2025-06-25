import * as CONST from '../../constants.js';
import { Entity } from '../entity.js';

export class Light extends Entity {
    constructor(sprite) {
        super(sprite, 0, 0, CONST.LIGHT_WIDTH, CONST.LIGHT_HEIGHT);
        this.power = 0;
    }

    setSize(size) {
        this.height = size;
        this.width = size;
    }

    move(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }
}
