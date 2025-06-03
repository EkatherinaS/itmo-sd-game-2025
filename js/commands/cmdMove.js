import * as CONST from "../constants.js"
import { Command } from "./command.js";

export class CmdMove extends Command {

    constructor(player, direction) {
        super();
        this.player = player;
        this.direction = direction;
    }

    invoke() {
        if (this.direction === CONST.MOVE_LEFT && this.player.x > 0) {
            this.player.x -= CONST.STEP;
        }
        if (this.direction === CONST.MOVE_RIGHT && this.player.x < CONST.GAME_WIDTH - CONST.PLAYER_WIDTH) {
            this.player.x += CONST.STEP;
        }
        if (this.direction === CONST.MOVE_UP && this.player.y > 0) {
            this.player.y -= CONST.STEP;
        }
        if (this.direction === CONST.MOVE_DOWN && this.player.y < CONST.GAME_HEIGHT - CONST.PLAYER_HEIGHT) {
            this.player.y += CONST.STEP;
        }
    }
}