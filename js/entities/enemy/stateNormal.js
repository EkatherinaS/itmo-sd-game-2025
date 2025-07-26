import { State } from './state.js';

export class StateNormal extends State {
    constructor(enemy) {
        super(enemy);
    }

    getMoveSpeed() {
        return 0.4;
    }
}
