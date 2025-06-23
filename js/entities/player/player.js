import { Actor } from '../actor.js';
import * as CONST from '../../constants.js';

export class Player extends Actor {
    constructor() {
        const x = Math.floor(CONST.GAME_WIDTH / CONST.STEP / 2) * CONST.STEP;
        const y = Math.floor(CONST.GAME_HEIGHT / CONST.STEP / 2) * CONST.STEP;
        const sprite = CONST.PLAYER_SPRITES[CONST.MOVE_DOWN][0];
        super(sprite, x, y, CONST.LIGHT_HEIGHT, CONST.LIGHT_WIDTH);
    }
}
