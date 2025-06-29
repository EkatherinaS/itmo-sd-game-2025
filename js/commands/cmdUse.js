import * as CONST from '../constants.js';
import { Command } from './command.js';

export class CmdUse extends Command {
    constructor(player, inventory, item) {
        super();
        this.inventory = inventory;
        this.player = player;
        this.item = item;
    }

    invoke() {
        switch (this.item) {
            case CONST.GREEN_MUSHROOM:
                if (this.inventory.useGreenMushroom())
                    this.player.setGreenLight();
                break;
            case CONST.BLUE_MUSHROOM:
                if (this.inventory.useBlueMushroom())
                    this.player.setBlueLight();
                break;
            case CONST.PURPLE_MUSHROOM:
                if (this.inventory.usePurpleMushroom())
                    this.player.setPurpleight();
                break;
            default:
                console.log(`Unknown item: ${expr}.`);
        }

        this.player.updateLight();
    }
}
