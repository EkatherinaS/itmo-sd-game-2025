import * as CONST from '../constants.js';
import { Position } from './position.js';

export class GameMap {
    constructor() {
        this.enemies = [];

        for (let i = 1; i < 10; i++) {
            const x = Math.floor(
                Math.random() * (CONST.GAME_WIDTH - CONST.ENEMY_WIDTH)
            );
            const y = Math.floor(
                Math.random() * (CONST.GAME_HEIGHT - CONST.ENEMY_HEIGHT)
            );
            this.enemies.push(new Position(x, y));
        }
    }
}
