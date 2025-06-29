import { Enemy } from './enemy.js';

export class DecoratorBase extends Enemy {
    constructor(enemy) {
        super(
            enemy.sprite,
            enemy.x,
            enemy.y,
            enemy.hp,
            enemy.power,
            enemy.armor
        );
        this.enemy = enemy;
    }

    fight(playerPower) {
        this.enemy.fight(playerPower);
    }

    move(positionLookup, player) {
        this.enemy.move(positionLookup, player);
    }

    changeToNormalState() {}

    getEnemy() {
        return this.enemy;
    }
}
