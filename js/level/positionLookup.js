import { Position } from './position.js';
import { PositionInfo } from './positionInfo.js';

export class PositionLookup {
    constructor(positionInfos) {
        this.positions = positionInfos;
        this.floor = new PositionInfo(0, false, false, false);
    }

    getPositionInfo(x, y) {
        const pos = new Position(x, y).toString();
        if (this.positions.get(pos) == undefined) return this.floor;
        else return this.positions.get(pos);
    }

    checkCollide(entity1, entity2) {
        return (
            (entity1.x <= entity2.x + entity2.width &&
                entity1.x >= entity2.x - entity2.width &&
                entity1.y <= entity2.y + entity2.height &&
                entity1.y >= entity2.y - entity2.height) ||
            (entity2.x <= entity1.x + entity1.width &&
                entity2.x >= entity1.x - entity1.width &&
                entity2.y <= entity1.y + entity1.height &&
                entity2.y >= entity1.y - entity1.height)
        );
    }
}
