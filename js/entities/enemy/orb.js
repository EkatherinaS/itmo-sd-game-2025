import { BaseEnemy } from './baseEnemy.js';
import { BehaviourAggressive } from './behaviourAggressive.js';
import * as CONST from '../../constants.js';

export class Orb extends BaseEnemy {
    constructor(playerLvl) {
        const sprite = CONST.ENEMY_SPRITES['orb'][0];
        super(
            sprite,
            CONST.ENEMY_ORB_HP,
            CONST.ENEMY_ORB_POWER,
            CONST.ENEMY_ORB_ARMOR,
            playerLvl
        );
        this.strategy = new BehaviourAggressive();
        this.frameCount = 6;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['orb'][this.getNextFrame()];
    }

    clone() {
        return new Orb(this.playerLvl);
    }
}
