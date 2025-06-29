import { DecoratorBase } from './decoratorBase.js';

export class DecoratorConfusion extends DecoratorBase {
    constructor(enemy) {
        super(enemy);
    }

    fight(playerPower) {
        this.hp -= playerPower;
    }
}
