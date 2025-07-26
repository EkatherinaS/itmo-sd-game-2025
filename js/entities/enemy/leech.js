import { BaseEnemy } from './baseEnemy.js';
import { BehaviourPassive } from './behaviourPassive.js';
import * as CONST from '../../constants.js';

export class Leech extends BaseEnemy {
    constructor(x, y, playerOrLevel) {
        let playerLvl, player;
        if (
            typeof playerOrLevel === 'object' &&
            playerOrLevel.lvl !== undefined
        ) {
            player = playerOrLevel;
            playerLvl = player.lvl;
        } else {
            playerLvl = playerOrLevel;
            player = null;
        }

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
        this.player = player;
        this.playerLvl = playerLvl;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['leech'][this.getNextFrame()];
    }

    clone() {
        const cloned = new Leech(this.x, this.y, this.player || this.playerLvl);
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
