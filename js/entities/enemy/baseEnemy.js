import * as CONST from "../../constants.js"
import { Enemy } from "./enemy.js";
import { StateNormal } from "./stateNormal.js";

export class BaseEnemy extends Enemy {

    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.state = new StateNormal();
        this.slowCount = 4;
    }

    move(positionLookup, player) {
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

        const blockedX = positionLookup.getPositionInfo(checkNewX, checkY).blocked ||
            positionLookup.getPositionInfo(checkNewX + width, checkY).blocked ||
            positionLookup.getPositionInfo(checkNewX, checkY + height).blocked ||
            positionLookup.getPositionInfo(checkNewX + width, checkY + height).blocked;

        const blockedY = positionLookup.getPositionInfo(checkX, checkNewY).blocked ||
            positionLookup.getPositionInfo(checkX + width, checkNewY).blocked ||
            positionLookup.getPositionInfo(checkX, checkNewY + height).blocked ||
            positionLookup.getPositionInfo(checkX + width, checkNewY + height).blocked;

        const wallX = nextX < 0 || nextX > CONST.GAME_WIDTH - CONST.ENEMY_WIDTH;
        const wallY = nextY < 0 || nextY > CONST.GAME_HEIGHT - CONST.ENEMY_HEIGHT;

        if (!blockedX && !wallX) this.x = nextX;
        if (!blockedY && !wallY) this.y = nextY;

        if (wallX) this.strategy.reverseX();
        if (wallY) this.strategy.reverseY();

        this.setNextSprite();
    }

    changeState(state) {
        this.state = state;
    }

    //clone()
}