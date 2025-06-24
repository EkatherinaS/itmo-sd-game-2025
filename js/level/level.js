import {
    LEVEL_TYPES_TEST,
    LEVEL_TYPES_RANDOM,
    LEVEL_TYPES_FROM_JSON,
} from '../constants.js';
import { LevelRandom } from './levelRandom.js';
import { LevelFromJSON } from './levelFromJSON.js';
import { LevelTest } from './levelTest.js';

export class Level {
    static create(mapType = LEVEL_TYPES_TEST, filePath = null, difficulty = 1) {
        switch (mapType) {
            case LEVEL_TYPES_RANDOM:
                return new LevelRandom(difficulty);
            case LEVEL_TYPES_FROM_JSON:
                return new LevelFromJSON(filePath);
            case LEVEL_TYPES_TEST:
                return new LevelTest();

            default:
                throw new Error(`Unknown map type: ${mapType}`);
        }
    }
}
