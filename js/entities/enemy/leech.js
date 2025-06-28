import { BaseEnemy } from './baseEnemy.js';
import { BehaviourPassive } from './behaviourPassive.js';
import * as CONST from '../../constants.js';

export class Leech extends BaseEnemy {
    constructor(playerLvl) {
        const sprite = CONST.ENEMY_SPRITES['leech'][0];
        super(
            sprite,
            CONST.ENEMY_LEECH_HP,
            CONST.ENEMY_LEECH_POWER,
            CONST.ENEMY_LEECH_ARMOR,
            playerLvl
        );
        this.strategy = new BehaviourPassive();
        this.frameCount = 6;
        this.slowCount = 6;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['leech'][this.getNextFrame()];
    }

    clone() {
        return new Leech(this.playerLvl);
    }
}
