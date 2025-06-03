import * as CONST from "./constants.js"

export class Controller {

    constructor() {
    }

    setEventListeners(player) {
        document.addEventListener('keydown', e => {
            if (e.keyCode === CONST.A_CODE) player.move(CONST.MOVE_LEFT);
            else if (e.keyCode === CONST.D_CODE) player.move(CONST.MOVE_RIGHT);
            else if (e.keyCode === CONST.W_CODE) player.move(CONST.MOVE_UP);
            else if (e.keyCode === CONST.S_CODE) player.move(CONST.MOVE_DOWN);
        });
    }
}