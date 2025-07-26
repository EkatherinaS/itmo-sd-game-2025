import { BehaviourStrategy } from './behaviourStrategy.js';

export class BehaviourAggressive extends BehaviourStrategy {
    constructor() {
        super();
        this.threshold = 10;
        this.randomPercent = 5;
    }

    getMoveDirection(enemy, player) {
        const dx = (player.x - enemy.x) * Math.random();
        const dy = (player.y - enemy.y) * Math.random();

        const magnitude = Math.hypot(dx, dy);
        const rand = Math.random() * 2 * Math.PI;
        const n = this.getRandom(100);

        let dirX = 0;
        let dirY = 0;

        if (Math.abs(dx) > this.threshold && magnitude != 0) {
            dirX = dx / magnitude;
        } else {
            if (n < this.randomPercent) dirX = Math.cos(rand);
            else dirX = this.direction.x;
        }

        if (Math.abs(dy) > this.threshold && magnitude != 0) {
            dirY = dy / magnitude;
        } else {
            if (n < this.randomPercent) dirY = Math.sin(rand);
            else dirY = this.direction.y;
        }

        this.direction = {
            x: dirX,
            y: dirY,
        };

        return this.direction;
    }
}
