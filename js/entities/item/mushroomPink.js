import * as CONST from '../../constants.js';
import { Bonus } from './bonus.js';

export class MushroomPink extends Bonus {
    constructor(x, y) {
        const sprite = CONST.MUSHROOM_SPRITES.pink;
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
        player.setPinkLight();
        this.alive = false;
        return true;
    }
}
