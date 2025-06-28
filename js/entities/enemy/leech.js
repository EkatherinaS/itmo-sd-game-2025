import { BaseEnemy } from './baseEnemy.js';
import { BehaviourPassive } from './behaviourPassive.js';
import * as CONST from '../../constants.js';

export class Leech extends BaseEnemy {
    constructor(x, y, playerLvl) {
        const sprite = CONST.ENEMY_SPRITES['leech'][0];
        super(
            sprite,
            x,
            y,
            CONST.ENEMY_LEECH_HP * CONST.ENEMY_HP_SCALE * playerLvl,
            CONST.ENEMY_LEECH_POWER * CONST.ENEMY_POWER_SCALE * playerLvl,
            CONST.ENEMY_LEECH_ARMOR * CONST.ENEMY_ARMOR_SCALE * playerLvl
        );
        this.strategy = new BehaviourPassive();
        this.frameCount = 6;
        this.slowCount = 6;
        this.playerLvl = playerLvl;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['leech'][this.getNextFrame()];
    }

    clone(x, y, playerLvl) {
        return new Leech(x, y, playerLvl);
    }
}
