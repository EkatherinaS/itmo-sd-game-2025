import * as CONST from '../../constants.js';
import { Enemy } from './enemy.js';
import { StateNormal } from './stateNormal.js';
import { StatePanic } from './statePanic.js';

export class BaseEnemy extends Enemy {
    constructor(sprite, hp, power, armor, lvl) {
        super(sprite, 0, 0, 0, 0, 0);
        this.stateNormal = new StateNormal(this);
        this.state = this.stateNormal;
        this.slowCount = 4;
        this.baseHp = hp;
        this.basePower = power;
        this.baseArmor = armor;
        this.#updateLvl(lvl);
    }

    fight(player, positionLookup) {
        const hit = player.fight(this, positionLookup);
        if (hit == 0) return false;

        this.hp -= hit;
        this.state = new StatePanic(this);
        return true;
    }

    update(positionLookup, player) {
        this.#move(positionLookup, player);
        this.#updateLvl(player.lvl);
    }

    #updateLvl(lvl) {
        this.hp = this.baseHp * CONST.ENEMY_HP_SCALE * lvl;
        this.power = this.basePower * CONST.ENEMY_POWER_SCALE * lvl;
        this.armor = this.baseArmor * CONST.ENEMY_ARMOR_SCALE * lvl;
    }

    #move(positionLookup, player) {
        const speed = this.state.getMoveSpeed();
        const dir = this.strategy.getMoveDirection(this, player);

        const nextX = this.x + dir.x * speed;
        const nextY = this.y + dir.y * speed;

        const width = CONST.ENEMY_WIDTH;
        const height = CONST.ENEMY_HEIGHT;

        const checkX = Math.round(this.x);
        const checkY = Math.round(this.y);
        const checkNewX = Math.round(nextX);
        const checkNewY = Math.round(nextY);

        const blockedX =
            positionLookup.getPositionInfo(checkNewX, checkY).blocked ||
            positionLookup.getPositionInfo(checkNewX + width, checkY).blocked ||
            positionLookup.getPositionInfo(checkNewX, checkY + height)
                .blocked ||
            positionLookup.getPositionInfo(checkNewX + width, checkY + height)
                .blocked;

        const blockedY =
            positionLookup.getPositionInfo(checkX, checkNewY).blocked ||
            positionLookup.getPositionInfo(checkX + width, checkNewY).blocked ||
            positionLookup.getPositionInfo(checkX, checkNewY + height)
                .blocked ||
            positionLookup.getPositionInfo(checkX + width, checkNewY + height)
                .blocked;

        const wallX = nextX < 0 || nextX > CONST.GAME_WIDTH - CONST.ENEMY_WIDTH;
        const wallY =
            nextY < 0 || nextY > CONST.GAME_HEIGHT - CONST.ENEMY_HEIGHT;

        if (!blockedX && !wallX) this.x = nextX;
        if (!blockedY && !wallY) this.y = nextY;

        if (wallX) this.strategy.reverseX();
        if (wallY) this.strategy.reverseY();

        this.setNextSprite();
    }

    changeToNormalState() {
        this.state = this.stateNormal;
    }

    //clone()
}
