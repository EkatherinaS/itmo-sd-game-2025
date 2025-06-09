import * as CONST from "./constants.js"
import { CommandFactory } from "./commands/commandFactory.js";

export class Controller {

    constructor() {
        this.commands = {
            "use": null,
            "changeActive": null,
            "up": null,
            "down": null,
            "left": null,
            "right": null,
            "attack": null
        };
    }

    setEventListeners(entityManager, positionLookup) {
        const commandFactory = new CommandFactory(entityManager, positionLookup);

        this.commands["up"] = commandFactory.createCmdMoveUp();
        this.commands["down"] = commandFactory.createCmdMoveDown();
        this.commands["left"] = commandFactory.createCmdMoveLeft();
        this.commands["right"] = commandFactory.createCmdMoveRight();

        document.addEventListener('keydown', e => {
            if (e.keyCode === CONST.W_CODE) this.commands["up"].invoke();
            else if (e.keyCode === CONST.S_CODE) this.commands["down"].invoke();
            else if (e.keyCode === CONST.A_CODE) this.commands["left"].invoke();
            else if (e.keyCode === CONST.D_CODE) this.commands["right"].invoke();
        });
    }
}