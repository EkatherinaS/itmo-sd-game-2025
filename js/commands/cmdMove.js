import * as CONST from "../constants.js"
import { Command } from "./command.js";

export class CmdMove extends Command {

    constructor(player, direction, positionLookup) {
        super();
        this.player = player;
        this.direction = direction;
        this.positionLookup = positionLookup;
    }

    invoke() {
        const x = this.player.x + Math.ceil((CONST.LIGHT_WIDTH - CONST.PLAYER_WIDTH) / 2);
        const y = this.player.y + Math.ceil((CONST.LIGHT_HEIGHT - CONST.PLAYER_HEIGHT) / 2);

        const frame = this.player.getNextFrame();
        this.player.sprite = CONST.PLAYER_SPRITES[this.direction][frame];

        if (this.direction === CONST.MOVE_LEFT && x > 0 &&
            !this.positionLookup.getPositionInfo(x - CONST.STEP, y).blocked &&
            !this.positionLookup.getPositionInfo(x - CONST.STEP, y + CONST.PLAYER_HEIGHT).blocked) {
            this.player.x -= CONST.STEP;
        }
        if (this.direction === CONST.MOVE_RIGHT && x < CONST.GAME_WIDTH - CONST.PLAYER_WIDTH &&
            !this.positionLookup.getPositionInfo(x + CONST.PLAYER_WIDTH + CONST.STEP, y).blocked &&
            !this.positionLookup.getPositionInfo(x + CONST.PLAYER_WIDTH + CONST.STEP, y + CONST.PLAYER_HEIGHT).blocked) {
            this.player.x += CONST.STEP;
        }
        if (this.direction === CONST.MOVE_UP && y > 0 &&
            !this.positionLookup.getPositionInfo(x, y - CONST.STEP).blocked &&
            !this.positionLookup.getPositionInfo(x + CONST.PLAYER_WIDTH, y - CONST.STEP).blocked) {
            this.player.y -= CONST.STEP;
        }
        if (this.direction === CONST.MOVE_DOWN && y < CONST.GAME_HEIGHT - CONST.PLAYER_HEIGHT &&
            !this.positionLookup.getPositionInfo(x, y + CONST.STEP + CONST.PLAYER_HEIGHT).blocked &&
            !this.positionLookup.getPositionInfo(x + CONST.PLAYER_WIDTH, y + CONST.STEP + CONST.PLAYER_HEIGHT).blocked) {
            this.player.y += CONST.STEP;
        }
    }
}