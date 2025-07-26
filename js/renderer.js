import * as CONST from './constants.js';

export class Renderer {
    constructor(ctx, ctxInfo) {
        this.ctx = ctx;
        this.ctxInfo = ctxInfo;
        this.images = {};

        this.ctxInfo.imageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        this.ctxInfo.font = 'bold 14px "Press Start 2P", Courier, monospace';
        this.ctxInfo.fillStyle = '#e0e0e0';
        this.ctxInfo.strokeStyle = '#222';
        this.ctxInfo.textAlign = 'left';
        this.ctxInfo.textBaseline = 'middle';
        this.ctxInfo.lineWidth = 1;

        this.gap = 12;
        this.offset = 1;

        CONST.IMAGES.forEach(name => {
            const img = new Image();
            img.src = `images/${name}`;
            this.images[name] = img;
        });
    }

    drawEntity(ctx, entity) {
        const img = this.images[entity.sprite];
        if (img) {
            ctx.drawImage(
                img,
                entity.x * CONST.PIXEL_SIZE,
                entity.y * CONST.PIXEL_SIZE,
                entity.width * CONST.PIXEL_SIZE,
                entity.height * CONST.PIXEL_SIZE
            );
        }
    }

    writeText(ctx, text, x, y) {
        ctx.fillText(text, x * CONST.PIXEL_SIZE, y * CONST.PIXEL_SIZE);
    }

    renderInfo(inventory, experience) {
        this.ctxInfo.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        );
        for (let i = 0; i < inventory.length; i++) {
            const item = inventory[i];
            item.x = (item.width + this.offset + this.gap) * i + this.offset;
            this.drawEntity(this.ctxInfo, item);
            this.writeText(
                this.ctxInfo,
                item.count,
                item.width + item.x + this.offset,
                item.height / 2
            );
        }

        for (let i = 0; i < experience.length; i++) {
            const item = experience[i];
            item.x =
                CONST.GAME_WIDTH -
                (item.width + this.offset + this.gap) * (i + 1);
            this.drawEntity(this.ctxInfo, item);
            this.writeText(
                this.ctxInfo,
                item.count,
                item.width + item.x + this.offset,
                item.height / 2
            );
        }
    }

    renderEntities(entities) {
        this.ctx.clearRect(
            0,
            0,
            CONST.GAME_WIDTH * CONST.PIXEL_SIZE,
            CONST.GAME_HEIGHT * CONST.PIXEL_SIZE
        );
        entities.forEach(entity => {
            this.drawEntity(this.ctx, entity);
        });
    }

    renderMap(map) {
        map.forEach(entity => {
            this.drawEntity(this.ctx, entity);
        });
    }
}
