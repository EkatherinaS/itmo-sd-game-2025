import * as CONST from '../constants.js';
import { CmdMove } from './cmdMove.js';
import { CmdUse } from './cmdUse.js';

export class CommandFactory {
    constructor(entityManager, positionLookup) {
        this.entityManager = entityManager;
        this.positionLookup = positionLookup;
    }

    createCmdMoveUp() {
        const player = this.entityManager.getPlayer();
        return new CmdMove(player, CONST.MOVE_UP, this.positionLookup);
    }

    createCmdMoveDown() {
        const player = this.entityManager.getPlayer();
        return new CmdMove(player, CONST.MOVE_DOWN, this.positionLookup);
    }

    createCmdMoveRight() {
        const player = this.entityManager.getPlayer();
        return new CmdMove(player, CONST.MOVE_RIGHT, this.positionLookup);
    }

    createCmdMoveLeft() {
        const player = this.entityManager.getPlayer();
        return new CmdMove(player, CONST.MOVE_LEFT, this.positionLookup);
    }

    createCmdUseGreenMushroom() {
        const player = this.entityManager.getPlayer();
        const inventory = this.entityManager.getInventory();
        return new CmdUse(player, inventory, CONST.GREEN_MUSHROOM);
    }

    createCmdUseBlueMushroom() {
        const player = this.entityManager.getPlayer();
        const inventory = this.entityManager.getInventory();
        return new CmdUse(player, inventory, CONST.BLUE_MUSHROOM);
    }

    createCmdUseYellowMushroom() {
        const player = this.entityManager.getPlayer();
        const inventory = this.entityManager.getInventory();
        return new CmdUse(player, inventory, CONST.PURPLE_MUSHROOM);
    }
}
