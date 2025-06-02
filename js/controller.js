import * as CONST from "./constants.js"

export class Controller {

    constructor(entityManager) {
        this.player = entityManager.getPlayer();

        document.addEventListener('keydown', e => {
            if (e.keyCode === CONST.A_CODE) this.player.move(CONST.MOVE_LEFT);
            else if (e.keyCode === CONST.D_CODE) this.player.move(CONST.MOVE_RIGHT);
            else if (e.keyCode === CONST.W_CODE) this.player.move(CONST.MOVE_UP);
            else if (e.keyCode === CONST.S_CODE) this.player.move(CONST.MOVE_DOWN);
        });
    }

}