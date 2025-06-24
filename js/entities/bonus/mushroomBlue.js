import * as CONST from '../../constants.js';
import { Bonus } from './bonus.js';

export class MushroomBlue extends Bonus {
    constructor(x, y) {
        const sprite = CONST.MUSHROOM_SPRITES.blue;
        super(sprite, x, y);
    }

    check(player) {
        const eat = player.checkCollide(
            this.x,
            this.y,
            this.width,
            this.height
        );
        if (!eat) return false;
        this.alive = false;
        return true;
    }

    add(inventory) {
        inventory.addBlueMushroom();
    }
}
