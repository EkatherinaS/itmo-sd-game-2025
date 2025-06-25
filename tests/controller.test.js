import * as CONST from '../js/constants.js';
import { CommandFactory } from '../js/commands/commandFactory.js';
import { EntityManager } from '../js/entityManager.js';
import { PositionLookup } from '../js/level/positionLookup.js';
import { Position } from '../js/level/position.js';
import { PositionInfo } from '../js/level/positionInfo.js';
import test from 'node:test';
import assert from 'node:assert';
import { Console, log } from 'node:console';

var lookup = new Map();
const initPos = { x: 2, y: 2 };
const blockPos = { x: 5, y: 5 };

lookup.set(
    new Position(blockPos.x, blockPos.y).toString(),
    new PositionInfo(0, false, false, true)
);
const positionLookup = new PositionLookup(lookup);
const entityManager = new EntityManager();
const commandFactory = new CommandFactory(entityManager, positionLookup);
const player = entityManager.getPlayer();

test('TestDown', () => {
    player.x = initPos.x;
    player.y = initPos.y;
    const cmd = commandFactory.createCmdMoveDown();
    cmd.invoke();
    assert.strictEqual(player.y, initPos.y + CONST.STEP);
    assert.strictEqual(player.x, initPos.x);
});

test('TestUp', () => {
    player.x = initPos.x;
    player.y = initPos.y;
    const cmd = commandFactory.createCmdMoveUp();
    cmd.invoke();
    assert.strictEqual(player.y, initPos.y - CONST.STEP);
    assert.strictEqual(player.x, initPos.x);
});

test('TestRight', () => {
    player.x = initPos.x;
    player.y = initPos.y;
    const cmd = commandFactory.createCmdMoveRight();
    cmd.invoke();
    assert.strictEqual(player.y, initPos.y);
    assert.strictEqual(player.x, initPos.x + CONST.STEP);
});

test('TestLeft', () => {
    player.x = initPos.x;
    player.y = initPos.y;
    const cmd = commandFactory.createCmdMoveLeft();
    cmd.invoke();
    assert.strictEqual(player.y, initPos.y);
    assert.strictEqual(player.x, initPos.x - CONST.STEP);
});

test('TestBlock', () => {
    player.x = blockPos.x - CONST.STEP - CONST.PLAYER_WIDTH;
    player.y = blockPos.y;
    console.log(positionLookup.getPositionInfo(blockPos.x, blockPos.y));
    const cmd = commandFactory.createCmdMoveRight();
    cmd.invoke();
    assert.strictEqual(player.y, blockPos.y);
    assert.strictEqual(player.x, blockPos.x - CONST.STEP - CONST.PLAYER_WIDTH);
});
