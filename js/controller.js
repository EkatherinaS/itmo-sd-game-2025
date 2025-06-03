import * as CONST from "./constants.js"
import { CommandFactory } from "./commands/commandFactory.js";

export class Controller {

    constructor(entityManager) {
        this.commandFactory = new CommandFactory(entityManager);
        this.commands = {
            "up": this.commandFactory.createCmdMoveUp(),
            "down": this.commandFactory.createCmdMoveDown(),
            "left": this.commandFactory.createCmdMoveLeft(),
            "right": this.commandFactory.createCmdMoveRight()
        };
    }

    setEventListeners() {
        document.addEventListener('keydown', e => {
            if (e.keyCode === CONST.W_CODE) this.commands["up"].invoke();
            else if (e.keyCode === CONST.S_CODE) this.commands["down"].invoke();
            else if (e.keyCode === CONST.A_CODE) this.commands["left"].invoke();
            else if (e.keyCode === CONST.D_CODE) this.commands["right"].invoke();
        });
    }
}