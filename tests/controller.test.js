import * as CONST from '../js/constants.js';
import { CommandFactory } from '../js/commands/commandFactory.js';
import { EntityManager } from '../js/entityManager.js';
import { PositionLookup } from '../js/level/positionLookup.js';
import { Position } from '../js/level/position.js';
import { PositionInfo } from '../js/level/positionInfo.js';
import test from 'node:test';
import assert from 'node:assert';

test('CommandFactory', () => {
    var lookup = new Map();
    for (let i = 0; i < CONST.BLOCK_WIDTH; i++) {
        for (let j = 0; j < CONST.BLOCK_HEIGHT; j++) {
            lookup.set(
                new Position(5 + i, 5 + j).toString(),
                new PositionInfo(0, false, false, true)
            );
            lookup.set(
                new Position(70 + i, 72 + j).toString(),
                new PositionInfo(0, false, false, true)
            );
            lookup.set(
                new Position(25 + i, 32 + j).toString(),
                new PositionInfo(0, false, false, true)
            );
            lookup.set(
                new Position(20 + i, 84 + j).toString(),
                new PositionInfo(0, true, false, false)
            );
            lookup.set(
                new Position(96 + i, 110 + j).toString(),
                new PositionInfo(0, false, true, false)
            );
        }
    }
    const positionLookup = new PositionLookup(lookup);
    const entityManager = new EntityManager();
    const player = entityManager.getPlayer();
    player.x = 0;
    player.y = 0;
    const commandFactory = new CommandFactory(entityManager, positionLookup);
    const up = commandFactory.createCmdMoveUp();
    assert.strictEqual(player.y, 0);
    assert.strictEqual(player.x, 0);
    up.invoke();
    assert.strictEqual(player.y, -CONST.STEP);
    assert.strictEqual(player.x, 0);
});
