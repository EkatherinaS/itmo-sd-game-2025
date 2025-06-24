import { Entity } from '../entity.js';

export class Environment extends Entity {
    constructor(sprite, x, y, width, height) {
        super(sprite, x, y, width, height);
        this.isInteractive = false;
    }
}
