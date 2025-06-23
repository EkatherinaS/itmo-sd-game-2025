import { BaseEnemy } from './baseEnemy.js';
import { BehaviourCowardy } from './behaviourCowardy.js';
import * as CONST from '../../constants.js';

export class Slug extends BaseEnemy {
    constructor(x, y) {
        const sprite = CONST.ENEMY_SPRITES['slug'][0];
        super(
            sprite,
            x,
            y,
            CONST.ENEMY_SLUG_HP,
            CONST.ENEMY_SLUG_POWER,
            CONST.ENEMY_SLUG_ARMOR
        );
        this.strategy = new BehaviourCowardy();
        this.frameCount = 8;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['slug'][this.getNextFrame()];
    }

    clone() {
        return new Slug(this.x, this.y);
    }
}
