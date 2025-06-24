import * as CONST from '../../constants.js';

import { Actor } from '../actor.js';
import { GreenLight } from './greenLight.js';
import { BlueLight } from './blueLight.js';
import { PurpleLight } from './purpleLight.js';
import { YellowLight } from './yellowLight.js';

export class Player extends Actor {
    constructor() {
        const x = Math.floor(CONST.GAME_WIDTH / CONST.STEP / 2) * CONST.STEP;
        const y = Math.floor(CONST.GAME_HEIGHT / CONST.STEP / 2) * CONST.STEP;
        const sprite = CONST.PLAYER_SPRITES[CONST.MOVE_DOWN][0];
        super(sprite, x, y, CONST.PLAYER_HEIGHT, CONST.PLAYER_WIDTH, 0, 0, 0);

        this.updateLvl(1);

        this.lights = {
            yellow: new YellowLight(),
            green: new GreenLight(),
            blue: new BlueLight(),
            purple: new PurpleLight(),
        };
        this.setYellowLight();
    }

    fight(enemy, positionLookup) {
        const collide = positionLookup.checkCollide(this, enemy);
        if (collide) {
            this.hp = Math.max(this.hp - enemy.power, 0);
        }
        if (
            Math.abs(enemy.x - (this.x + this.width / 2)) ** 2 +
                Math.abs(enemy.y - (this.y + this.height / 2)) ** 2 <
            this.armor ** 2
        ) {
            return this.power + this.light.power;
        }
        return 0;
    }

    updateLight() {
        if (this.light != null) {
            this.light.setSize(this.armor + this.light.armor);
            this.light.move(this.x + this.width / 2, this.y + this.height / 2);
            if (this.light.duration > 0 && !this.light.timeoutId) {
                this.light.timeoutId = setTimeout(() => {
                    this.light.timeoutId = null;
                    this.setYellowLight();
                }, this.light.duration);
            }
        }
    }

    getEntities() {
        if (this.light != null) {
            return [this.light, this];
        }
        return [this];
    }

    setYellowLight() {
        this.light = this.lights.yellow;
        this.updateLight();
    }

    setGreenLight() {
        this.light = this.lights.green;
        this.updateLight();
    }

    setBlueLight() {
        this.light = this.lights.blue;
        this.updateLight();
    }

    setPurpleight() {
        this.light = this.lights.purple;
        this.updateLight();
    }

    updateLvl(lvl) {
        this.power = lvl * CONST.PLAYER_POWER_MOD;
        this.hp = lvl * CONST.PLAYER_HP_MOD;
        this.armor = Math.max(
            lvl * CONST.PLAYER_ARMOR_MOD,
            CONST.PLAYER_ARMOR_MIN
        );
    }

    setCoords(input_x, input_y) {
        this.x = input_x;
        this.y = input_y;
        this.updateLight();
    }
}
