import { Block } from './block.js';
import { EntryPoint } from './entryPoint.js';
import { ExitPoint } from './exitPoint.js';

export class EnvironmentFactory {
    static createBlock(x, y) {
        return new Block(x, y);
    }

    static createEntry(x, y) {
        return new EntryPoint(x, y);
    }

    static createExit(x, y) {
        return new ExitPoint(x, y);
    }
}
