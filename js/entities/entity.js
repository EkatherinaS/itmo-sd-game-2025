export class Entity {
    constructor(sprite, x = 0, y = 0, width = 0, height = 0, type = null) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }
}
