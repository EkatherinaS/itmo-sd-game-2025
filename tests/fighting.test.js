import { describe, it, mock, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { BaseEnemy } from '../js/entities/enemy/baseEnemy.js';
import { StateNormal } from '../js/entities/enemy/stateNormal.js';
import { StatePanic } from '../js/entities/enemy/statePanic.js';

describe('Fighting Test Suit', () => {
    let enemy, mockPlayer, mockPositionLookup, mockStrategy;
    const x = 0,
        y = 0,
        hp = 100,
        power = 10,
        armor = 10;

    beforeEach(() => {
        mockPlayer = {
            fight: mock.fn(),
        };
        mockPositionLookup = {
            checkCollide: mock.fn(() => {
                return true;
            }),
        };
        mockStrategy = {
            getMoveDirection: mock.fn(() => ({ x: 1, y: 0 })),
            reverseX: mock.fn(),
            reverseY: mock.fn(),
        };
        enemy = new BaseEnemy({}, x, y, hp, power, armor);
    });

    describe('constructor', () => {
        it('should initialize correctly', () => {
            assert.equal(enemy.x, x);
            assert.equal(enemy.y, y);
            assert.equal(enemy.hp, hp);
            assert.equal(enemy.power, power);
            assert.equal(enemy.armor, armor);
            assert.ok(enemy.state instanceof StateNormal);
        });
    });

    it('should take dmg', () => {
        mockPlayer.fight.mock.mockImplementation(() => 10);
        enemy.fight(mockPlayer, mockPositionLookup);
        assert.strictEqual(enemy.hp, hp - 10);
    });

    it('should panic', () => {
        mockPlayer.fight.mock.mockImplementation(() => 10);
        enemy.fight(mockPlayer, mockPositionLookup);
        assert.ok(enemy.state instanceof StatePanic);
    });
});
