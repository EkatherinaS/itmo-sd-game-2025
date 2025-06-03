import { Actor } from "./actor.js";
import * as CONST from "../constants.js"

export class Player extends Actor {

    constructor() {
        const x = Math.floor(CONST.GAME_WIDTH / CONST.STEP / 2) * CONST.STEP;
        const y = Math.floor(CONST.GAME_HEIGHT / CONST.STEP / 2) * CONST.STEP;
        const sprite = 'lumen.svg';
        super(sprite, x, y, CONST.PLAYER_WIDTH, CONST.PLAYER_HEIGHT);
    }
}