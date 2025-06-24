import * as CONST from './constants.js';
import { CommandFactory } from './commands/commandFactory.js';

export class Controller {
    constructor() {
        this.commands = {
            use: null,
            changeActive: null,
            up: null,
            down: null,
            left: null,
            right: null,
            attack: null,
        };
    }

    setEventListeners(entityManager, positionLookup) {
        const commandFactory = new CommandFactory(
            entityManager,
            positionLookup
        );

        this.commands['up'] = commandFactory.createCmdMoveUp();
        this.commands['down'] = commandFactory.createCmdMoveDown();
        this.commands['left'] = commandFactory.createCmdMoveLeft();
        this.commands['right'] = commandFactory.createCmdMoveRight();

        this.commands['green'] = commandFactory.createCmdUseGreenMushroom();
        this.commands['blue'] = commandFactory.createCmdUseBlueMushroom();
        this.commands['yellow'] = commandFactory.createCmdUseYellowMushroom();

        document.addEventListener('keydown', e => {
            if (CONST.KEY_UP.includes(e.key)) this.commands.up?.invoke();
            else if (CONST.KEY_DOWN.includes(e.key))
                this.commands.down?.invoke();
            else if (CONST.KEY_LEFT.includes(e.key))
                this.commands.left?.invoke();
            else if (CONST.KEY_RIGHT.includes(e.key))
                this.commands.right?.invoke();
            else if (CONST.KEY_ITEM_1.includes(e.key))
                this.commands.green?.invoke();
            else if (CONST.KEY_ITEM_2.includes(e.key))
                this.commands.blue?.invoke();
            else if (CONST.KEY_ITEM_3.includes(e.key))
                this.commands.yellow?.invoke();
        });
    }
}
