import { LevelBase } from './levelBase.js';
import { MapFactory } from './mapFactory.js';

export class LevelFromJSON extends LevelBase {
    constructor(filePath = '/itmo-sd-game-2025/levelMaps/levelTest.json') {
        super();
        this.filePath = filePath;
        this.mapFactory = new MapFactory();
    }

    async init() {
        try {
            this.entities = await this.mapFactory.createFromJSON(this.filePath);
            return Promise.resolve();
        } catch (error) {
            console.error('Loading failed:', error);
            this.entities = this.mapFactory.getTestData();
            return this.entities;
        }
    }
}
