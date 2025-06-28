import { BaseEnemy } from './baseEnemy.js';
import { BehaviourAggressive } from './behaviourAggressive.js';
import * as CONST from '../../constants.js';

export class Orb extends BaseEnemy {
    constructor(x, y, playerLvl) {
        const sprite = CONST.ENEMY_SPRITES['orb'][0];
        super(
            sprite,
            x,
            y,
            CONST.ENEMY_ORB_HP * CONST.ENEMY_HP_SCALE * playerLvl,
            CONST.ENEMY_ORB_POWER * CONST.ENEMY_POWER_SCALE * playerLvl,
            CONST.ENEMY_ORB_ARMOR * CONST.ENEMY_ARMOR_SCALE * playerLvl
        );
        this.strategy = new BehaviourAggressive();
        this.frameCount = 6;
        this.playerLvl = playerLvl;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['orb'][this.getNextFrame()];
    }

    clone() {
        const cloned = new Orb(this.x, this.y, this.playerLvl);
        cloned.hp = this.hp;
        cloned.power = this.power;
        cloned.armor = this.armor;
        cloned.baseHp = this.baseHp;
        cloned.basePower = this.basePower;
        cloned.baseArmor = this.baseArmor;
        cloned.slowCount = this.slowCount;
        cloned.frame = this.frame;
        cloned.frameCount = this.frameCount;
        cloned.count = this.count;
        return cloned;
    }
}
