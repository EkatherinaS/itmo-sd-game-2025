import { describe, it, mock, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { EntityManager } from '../js/entityManager.js';
import { MushroomBlue } from '../js/entities/bonus/mushroomBlue.js';

describe('Player info test suit', () => {
    let entityManager, mockPlayer, mockPositionLookup;
    beforeEach(() => {
        mock.reset();
        mockPlayer = {
            fight: mock.fn(),
        };
        mockPositionLookup = {
            checkCollide: mock.fn(() => {
                return true;
            }),
        };

        entityManager = new EntityManager();
        entityManager.player = mockPlayer;
        entityManager.positionLookup = mockPositionLookup;
    });

    it('should pick up mushroom', () => {
        const player = entityManager.getPlayer();
        entityManager.bonuses.push(new MushroomBlue(player.x, player.y));
        entityManager.checkCollide();

        const inventory = entityManager.getInventory();
        const items = inventory.getItems();
        assert.equal(items.length, 3);
        assert.equal(items[1].count, 1);
    });

    it('should pick up all mushroom stress-test', () => {
        const player = entityManager.getPlayer();
        const n = 100;
        for (let i = 1; i <= n; ++i) {
            let mushroom = new MushroomBlue(player.x, player.y);
            entityManager.bonuses.push(mushroom);

            assert.equal(mushroom.isAlive(), true);
            entityManager.checkCollide();
            const inventory = entityManager.getInventory();
            const items = inventory.getItems();
            assert.equal(items.length, 3);
            assert.equal(items[1].count, i);
            assert.equal(mushroom.isAlive(), false);
        }
    });
});
