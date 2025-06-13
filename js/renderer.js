import * as CONST from './constants.js';

export class Renderer {
    constructor(ctx, entityManager) {
        this.ctx = ctx;
        this.entityManager = entityManager;
        this.images = {};

        CONST.IMAGES.forEach(name => {
            const img = new Image();
            img.src = `images/${name}`;
            this.images[name] = img;
        });
    }

    renderEntities(entities) {
        this.ctx.clearRect(
            0,
            0,
            CONST.GAME_WIDTH * CONST.PIXEL_SIZE,
            CONST.GAME_HEIGHT * CONST.PIXEL_SIZE
        );
        entities.forEach(entity => {
            const img = this.images[entity.sprite];
            if (img) {
                this.ctx.drawImage(
                    img,
                    entity.x * CONST.PIXEL_SIZE,
                    entity.y * CONST.PIXEL_SIZE,
                    entity.width * CONST.PIXEL_SIZE,
                    entity.height * CONST.PIXEL_SIZE
                );
            }
        });
    }

    renderMap(map) {
        map.forEach(entity => {
            const img = this.images[entity.sprite];
            if (img) {
                this.ctx.drawImage(
                    img,
                    entity.x * CONST.PIXEL_SIZE,
                    entity.y * CONST.PIXEL_SIZE,
                    entity.width * CONST.PIXEL_SIZE,
                    entity.height * CONST.PIXEL_SIZE
                );
            }
        });
    }
}
