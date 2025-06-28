import { BaseEnemy } from './baseEnemy.js';
import { BehaviourCowardy } from './behaviourCowardy.js';
import * as CONST from '../../constants.js';

export class Slug extends BaseEnemy {
    constructor(x, y, playerLvl) {
        const sprite = CONST.ENEMY_SPRITES['slug'][0];
        super(
            sprite,
            x,
            y,
            CONST.ENEMY_SLUG_HP * CONST.ENEMY_HP_SCALE * playerLvl,
            CONST.ENEMY_SLUG_POWER * CONST.ENEMY_POWER_SCALE * playerLvl,
            CONST.ENEMY_SLUG_ARMOR * CONST.ENEMY_ARMOR_SCALE * playerLvl
        );
        this.strategy = new BehaviourCowardy();
        this.frameCount = 8;
        this.playerLvl = playerLvl;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['slug'][this.getNextFrame()];
    }

    clone() {
        const cloned = new Slug(this.x, this.y, this.playerLvl);
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
