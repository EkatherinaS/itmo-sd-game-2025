import { Actor } from '../actor.js';
import * as CONST from '../../constants.js';

export class Enemy extends Actor {
    constructor(sprite, x, y) {
        super(sprite, x, y, CONST.ENEMY_HEIGHT, CONST.ENEMY_WIDTH);
    }

    //clone()
    //move()
}
