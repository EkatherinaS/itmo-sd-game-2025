import { Entity } from "./entity.js"
import * as CONST from "./constants.js"
import { ImageLoader } from "./imageLoader.js";

export class Player extends Entity {

    constructor() {
        const loader = new ImageLoader();
        const x = Math.floor(CONST.GAME_WIDTH / CONST.PLAYER_WIDTH / 2) * CONST.PLAYER_WIDTH;
        const y = Math.floor(CONST.GAME_HEIGHT / CONST.PLAYER_HEIGHT / 2) * CONST.PLAYER_HEIGHT;
        const sprite = loader.get('lumen.svg');
        super(sprite, x, y, CONST.PLAYER_WIDTH, CONST.PLAYER_HEIGHT);
    }

    move(direction) {
        if (direction === CONST.MOVE_LEFT && this.x > 0) {
            this.x -= CONST.PLAYER_WIDTH;
        }
        if (direction === CONST.MOVE_RIGHT && this.x < CONST.GAME_WIDTH - CONST.PLAYER_WIDTH) {
            this.x += CONST.PLAYER_WIDTH;
        }
        if (direction === CONST.MOVE_UP && this.y > 0) {
            this.y -= CONST.PLAYER_HEIGHT;
        }
        if (direction === CONST.MOVE_DOWN && this.y < CONST.GAME_HEIGHT - CONST.PLAYER_HEIGHT) {
            this.y += CONST.PLAYER_HEIGHT;
        }
    }
}