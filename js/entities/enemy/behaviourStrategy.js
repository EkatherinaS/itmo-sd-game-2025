export class BehaviourStrategy {
    constructor() {
        this.direction = { x: 0, y: 0 };
    }

    getRandom(max) {
        return Math.floor(Math.random() * max);
    }

    reverseX() {
        this.direction.x = -this.direction.x;
    }

    reverseY() {
        this.direction.y = -this.direction.y;
    }
}
