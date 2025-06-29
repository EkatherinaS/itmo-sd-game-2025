import * as CONST from '../../constants.js';
import { DecoratorConfusion } from '../enemy/decoratorConfision.js';
import { Light } from './light.js';

export class PurpleLight extends Light {
    constructor(x, y) {
        const sprite = CONST.LIGHT_SPRITES.purple;
        super(sprite, x, y);

        this.armor = 10;
        this.power = 10;
        this.duration = 5000;
    }

    useEffect(enemy) {
        console.log('PURPLE');
        return new DecoratorConfusion(enemy);
    }
}
