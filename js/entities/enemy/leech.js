import { BaseEnemy } from "./baseEnemy.js";
import { BehaviourPassive } from "./behaviourPassive.js";
import * as CONST from "../../constants.js"

export class Leech extends BaseEnemy {

    constructor(x, y) {
        const sprite = CONST.ENEMY_SPRITES['leech'][0];
        super(sprite, x, y);
        this.strategy = new BehaviourPassive();
        this.frameCount = 6;
        this.slowCount = 6;
    }

    setNextSprite() {
        this.sprite = CONST.ENEMY_SPRITES['leech'][this.getNextFrame()];
    }

    clone() {
        return new Leech(this.x, this.y);
    }
}