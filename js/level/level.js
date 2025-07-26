import * as CONST from '../constants.js';
import { LevelRandom } from './levelRandom.js';
import { LevelFromJSON } from './levelFromJSON.js';
import { LevelTest } from './levelTest.js';
import { GameMap } from './gameMap.js';

export class Level {
    static create(
        mapType = CONST.LEVEL_TYPES_TEST,
        filePath = null,
        difficulty = 1,
        playerLevel = 1
    ) {
        switch (mapType) {
            case CONST.LEVEL_TYPES_RANDOM:
                return new LevelRandom(difficulty, playerLevel);
            case CONST.LEVEL_TYPES_FROM_JSON:
                return new LevelFromJSON(filePath);
            case CONST.LEVEL_TYPES_TEST:
                return new LevelTest();

            default:
                throw new Error(`Unknown map type: ${mapType}`);
        }
    }

    getMap() {
        return new GameMap();
    }
}
