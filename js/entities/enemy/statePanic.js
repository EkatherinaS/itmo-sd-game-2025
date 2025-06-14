import { State } from './state.js';

export class StatePanic extends State {
    constructor() {
        super();
    }

    getMoveSpeed() {
        return 4;
    }
}
