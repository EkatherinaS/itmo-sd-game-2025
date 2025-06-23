import * as CONST from '../../constants.js';

import { Actor } from '../actor.js';
import { GreenLight } from './greenLight.js';
import { PinkLight } from './pinkLight.js';
import { YellowLight } from './yellowLight.js';


export class Player extends Actor {

    constructor() {
        const x = Math.floor(CONST.GAME_WIDTH / CONST.STEP / 2) * CONST.STEP;
        const y = Math.floor(CONST.GAME_HEIGHT / CONST.STEP / 2) * CONST.STEP;
        const sprite = CONST.PLAYER_SPRITES[CONST.MOVE_DOWN][0];
        super(sprite, x, y, CONST.LIGHT_HEIGHT, CONST.LIGHT_WIDTH, CONST.PLAYER_INIT_HP, CONST.PLAYER_INIT_POWER, CONST.PLAYER_INIT_ARMOR);

        this.lights = {
            green: new GreenLight(),
            pink: new PinkLight(),
            yellow: new YellowLight()
        }
        this.setYellowLight();
    }

    checkCollide(x, y, height, width) {
        const xReal = this.x + (CONST.LIGHT_WIDTH - CONST.PLAYER_WIDTH) / 2;
        const yReal = this.y + (CONST.LIGHT_HEIGHT - CONST.PLAYER_HEIGHT) / 2;
        return (
            xReal <= x + width && xReal >= x - width &&
            yReal <= y + height && yReal >= y - height
        ) || (
                x <= xReal + CONST.PLAYER_WIDTH && x >= xReal - CONST.PLAYER_WIDTH &&
                y <= yReal + CONST.PLAYER_HEIGHT && y >= yReal - CONST.PLAYER_HEIGHT
            );
    }

    fight(x, y, power, width, height) {
        if (this.checkCollide(x, y, height, width)) {
            this.hp -= power;
        }
        if (Math.abs(x - (this.x + this.width / 2)) ** 2 + Math.abs(y - (this.y + this.height / 2)) ** 2 < this.armor ** 2) {
            this.armor += 0.1;
            return this.power + this.light.power;
        }
        return 0;
    }

    updateLight() {
        if (this.light != null) {
            this.light.setSize(this.armor);
            this.light.move(this.x + this.width / 2, this.y + this.height / 2);
        }
    }

    getEntities() {
        if (this.light != null) {
            return [this.light, this];
        }
        return [this];
    }

    setGreenLight() {
        this.light = this.lights.green;
        this.updateLight();
    }

    setPinkLight() {
        this.light = this.lights.pink;
        this.updateLight();
    }

    setYellowLight() {
        this.light = this.lights.yellow;
        this.updateLight();
    }
}
