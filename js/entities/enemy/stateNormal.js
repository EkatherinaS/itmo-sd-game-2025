import { State } from './state.js';

export class StateNormal extends State {
    constructor() {
        super();
    }

    getMoveSpeed() {
        return 0.4;
    }
}
