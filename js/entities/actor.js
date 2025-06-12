import { Entity } from "./entity.js"

export class Actor extends Entity {

    constructor(sprite, x = 0, y = 0, width = 0, height = 0, hp = 0, attack = 0, armor = 0) {
        super(sprite, x, y, width, height);
        this.hp = hp;
        this.attack = attack;
        this.armor = armor;

        this.frame = 0;
        this.frameCount = 4;
        this.slowCount = 1;

        this.count = 4;
    }

    getNextFrame() {
        if (this.count == 0) {
            this.frame = (this.frame + 1) % this.frameCount;
            this.count = this.slowCount;
        } else {
            this.count--;
        }
        return this.frame;
    }
}