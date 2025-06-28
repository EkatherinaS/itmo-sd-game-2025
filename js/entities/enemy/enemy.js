import { Actor } from '../actor.js';
import * as CONST from '../../constants.js';

export class Enemy extends Actor {
    constructor(sprite, x, y, hp, power, armor) {
        super(
            sprite,
            x,
            y,
            CONST.ENEMY_WIDTH,
            CONST.ENEMY_HEIGHT,
            hp,
            power,
            armor
        );
    }

    //clone()
    //move()
}
