import { AbstractMapFactory } from './factories/abstractMapFactory.js';
import { JSONMapFactory } from './factories/jsonMapFactory.js';
import { RandomMapFactory } from './factories/randomMapFactory.js';
import { TestMapFactory } from './factories/testMapFactory.js';

export class MapFactory {
    constructor() {
        this.factories = {
            json: new JSONMapFactory(),
            random: new RandomMapFactory(),
            test: new TestMapFactory(),
        };
    }

    async createFromJSON(filePath) {
        return this.factories.json.createMap(filePath);
    }

    createRandom(difficulty = 1) {
        return this.factories.random.createMap(difficulty);
    }

    createTest() {
        return this.factories.test.createMap();
    }


    getFactory(type) {
        if (!this.factories[type]) {
            throw new Error(`Unknown factory type: ${type}`);
        }
        return this.factories[type];
    }


    addFactory(type, factory) {
        if (!(factory instanceof AbstractMapFactory)) {
            throw new Error('Factory must extend AbstractMapFactory');
        }
        this.factories[type] = factory;
    }

    getTestData() {
        return this.factories.test.createMap();
    }
}

export { AbstractMapFactory, JSONMapFactory, RandomMapFactory, TestMapFactory };
