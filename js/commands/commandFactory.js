import * as CONST from "../constants.js"
import { CmdMove } from "./cmdMove.js"


export class CommandFactory {

    constructor(entityManager) {
        this.entityManager = entityManager;
    }

    createCmdMoveUp() {
        const player = this.entityManager.getPlayer();
        return new CmdMove(player, CONST.MOVE_UP);
    }

    createCmdMoveDown() {
        const player = this.entityManager.getPlayer();
        return new CmdMove(player, CONST.MOVE_DOWN);
    }

    createCmdMoveRight() {
        const player = this.entityManager.getPlayer();
        return new CmdMove(player, CONST.MOVE_RIGHT);
    }

    createCmdMoveLeft() {
        const player = this.entityManager.getPlayer();
        return new CmdMove(player, CONST.MOVE_LEFT);
    }
}