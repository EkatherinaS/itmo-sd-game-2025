import * as CONST from "./constants.js"

export class Renderer {
    constructor(ctx, entityManager) {
        this.ctx = ctx;
        this.entityManager = entityManager;
    }

    renderAll() {
        this.ctx.clearRect(0, 0, CONST.GAME_WIDTH, CONST.GAME_HEIGHT);

        const entitites = this.entityManager.getAllEntities();
        entitites.forEach(entity => {
            if (entity.sprite) {
                this.ctx.drawImage(entity.sprite, entity.x, entity.y, entity.width, entity.height);
            }
        });
    }
}