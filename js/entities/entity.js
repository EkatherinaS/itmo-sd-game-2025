export class Entity {
    constructor(sprite, x = 0, y = 0, width = 0, height = 0) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }
}
