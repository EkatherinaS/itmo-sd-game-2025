import { BaseEnemy } from './baseEnemy.js';
import { BehaviourAggressive } from './behaviourAggressive.js';
import * as CONST from '../../constants.js';

export class Orb extends BaseEnemy {
    constructor(x, y) {
        const sprite = CONST.ENEMY_SPRITES['orb'][0];
        super(sprite, x, y);
        this.strategy = new BehaviourAggressive();
        this.frameCount = 6;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['orb'][this.getNextFrame()];
    }

    clone() {
        return new Orb(this.x, this.y);
    }
}
