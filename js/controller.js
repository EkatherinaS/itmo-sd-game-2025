import * as CONST from './constants.js';
import { CommandFactory } from './commands/commandFactory.js';

export class Controller {
    constructor() {
        this.isSetUp = false;
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

    #resetCommands(positionLookup) {
        this.commands['up'].resetPositionLookup(positionLookup);
        this.commands['down'].resetPositionLookup(positionLookup);
        this.commands['left'].resetPositionLookup(positionLookup);
        this.commands['right'].resetPositionLookup(positionLookup);
    }

    setEventListeners(entityManager, positionLookup) {
        if (this.isSetUp) {
            this.#resetCommands(positionLookup);
            return;
        }

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
        this.commands['purple'] = commandFactory.createCmdUsePurpleMushroom();

        this.pressedKeys = new Set();

        this.registerOnKeydown = [
            { keys: CONST.KEY_ITEM_1, command: this.commands['green'] },
            { keys: CONST.KEY_ITEM_2, command: this.commands['blue'] },
            { keys: CONST.KEY_ITEM_3, command: this.commands['purple'] },
        ];

        this.registerOnHold = [
            { keys: CONST.KEY_UP, command: this.commands['up'] },
            { keys: CONST.KEY_DOWN, command: this.commands['down'] },
            { keys: CONST.KEY_LEFT, command: this.commands['left'] },
            { keys: CONST.KEY_RIGHT, command: this.commands['right'] },
        ];

        document.addEventListener('keydown', e => {
            this.pressedKeys.add(e.key);

            this.registerOnKeydown.forEach(x => {
                if (x.keys.includes(e.key)) {
                    x.command?.invoke();
                }
            });
        });

        document.addEventListener('keyup', e => {
            this.pressedKeys.delete(e.key);
        });

        this.isSetUp = true;
    }

    update() {
        this.registerOnHold.forEach(x => {
            if (x.keys.some(k => this.pressedKeys.has(k))) {
                x.command?.invoke();
            }
        });
    }
}
