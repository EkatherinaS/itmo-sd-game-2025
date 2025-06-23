import { BehaviourStrategy } from './behaviourStrategy.js';

export class BehaviourPassive extends BehaviourStrategy {
    constructor() {
        super();
        this.randomPercent = 10;
    }

    getMoveDirection(enemy, player) {
        const rand = Math.random() * 2 * Math.PI;
        const n = this.getRandom(100);

        const dirX = n < this.randomPercent ? Math.cos(rand) : this.direction.x;
        const dirY = n < this.randomPercent ? Math.sin(rand) : this.direction.y;

        this.direction = {
            x: dirX,
            y: dirY,
        };

        return this.direction;
    }
}
