import * as CONST from '../../constants.js';
import { Entity } from '../entity.js';

export class Bonus extends Entity {
    constructor(sprite, x, y) {
        super(sprite, x, y, CONST.BONUS_WIDTH, CONST.BONUS_HEIGHT);
        this.alive = true;
    }

    check(player) {
        return false;
    }

    add(inventory) {}

    isAlive() {
        return this.alive;
    }
}
