import * as CONST from "./constants.js"

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.images = {};

        CONST.IMAGES.forEach(name => {
            const img = new Image();
            img.src = `images/${name}`;
            this.images[name] = img;
        });
    }

    renderAll(entities) {
        this.ctx.clearRect(0, 0, CONST.GAME_WIDTH, CONST.GAME_HEIGHT);
        entities.forEach(entity => {
            const img = this.images[entity.sprite];
            if (img) {
                this.ctx.drawImage(img, entity.x, entity.y, entity.width, entity.height);
            }
        });
    }
}