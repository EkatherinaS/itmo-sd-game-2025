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
}
