import { State } from './state.js';

export class StatePanic extends State {
    constructor(enemy) {
        super(enemy);

        setTimeout(() => {
            enemy.changeToNormalState();
        }, '1000');
    }

    getMoveSpeed() {
        return 1;
    }
}
