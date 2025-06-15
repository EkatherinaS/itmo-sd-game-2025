import { LevelBase } from "./levelBase.js";
import { MapFactory } from "./mapFactory.js";

export class LevelTest extends LevelBase {
    constructor() {
        super();
        this.mapFactory = new MapFactory();
        this.init();
    }

    init() {
        this.entities = this.mapFactory.getTestData();
        return Promise.resolve();
    }
}