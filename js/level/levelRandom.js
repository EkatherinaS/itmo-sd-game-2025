import { LevelBase } from "./levelBase.js";
import { MapFactory } from "./mapFactory.js";

export class LevelRandom extends LevelBase {
    constructor(difficulty = 1) {
        super();
        this.difficulty = difficulty;
        this.mapFactory = new MapFactory();
        this.init();
    }

    init() {
        this.entities = this.mapFactory.createRandom(this.difficulty);
        return Promise.resolve();
    }
}