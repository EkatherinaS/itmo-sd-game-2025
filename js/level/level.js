import { LEVEL_TYPES } from '../constants.js';
import { LevelRandom } from './levelRandom.js';
import { LevelFromJSON } from './levelFromJSON.js';
import { LevelTest } from './levelTest.js';

export class Level {
    static create(mapType = LEVEL_TYPES.TEST, filePath = null, difficulty = 1) {
        switch (mapType) {
            case LEVEL_TYPES.RANDOM:
                return new LevelRandom(difficulty);
            case LEVEL_TYPES.FROM_JSON:
                return new LevelFromJSON(filePath);
            case LEVEL_TYPES.TEST:
                return new LevelTest();

            default:
                throw new Error(`Unknown map type: ${mapType}`);
        }
    }
}
