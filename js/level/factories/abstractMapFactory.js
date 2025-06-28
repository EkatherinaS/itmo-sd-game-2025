export class AbstractMapFactory {
    constructor() {
        if (this.constructor === AbstractMapFactory) {
            throw new Error('AbstractMapFactory cannot be instantiated directly');
        }
    }

    createBlock(x, y, width, height) {
        throw new Error('createBlock method must be implemented');
    }

    createEntryPoint(x, y, width, height) {
        throw new Error('createEntryPoint method must be implemented');
    }

    createExitPoint(x, y, width, height) {
        throw new Error('createExitPoint method must be implemented');
    }

    createMap() {
        throw new Error('createMap method must be implemented');
    }
} 