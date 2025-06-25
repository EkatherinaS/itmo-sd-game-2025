import fs from 'fs/promises';
import path from 'path';
import test from 'node:test';
import assert from 'node:assert';
import {
    LEVEL_TYPES_FROM_JSON,
    LEVEL_TYPES_RANDOM,
    STEP,
} from '../js/constants.js';
import { Level } from '../js/level/level.js';

const levelsFolder = path.resolve('levelMaps');

const testReachablility = level => {
    const lookup = level.getPositionLookup();
    const s = lookup.getPositionInfo(level.getEntry().x, level.getEntry().y);
    const t = lookup.getPositionInfo(level.getExit().x, level.getExit().y);
    const q = [];
    q.push(s);
    let reached = false;
    const was = [];
    while (q.length) {
        const v = q.pop();
        was.push(v);
        if (v.x == t.x && v.y == t.y) {
            reached = true;
            break;
        }
        const step = [
            lookup.getPositionInfo(v.x, v.y - STEP),
            lookup.getPositionInfo(v.x, v.y + STEP),
            lookup.getPositionInfo(v.x + STEP, v.y),
            lookup.getPositionInfo(v.x - STEP, v.y),
        ];

        step.filter(e => was.includes(e)).forEach(entry => {
            q.push(entry);
        });
    }

    return reached;
};

test('ReachablilityRandom', () => {
    const level = Level.create(LEVEL_TYPES_RANDOM);
    assert.strictEqual(testReachablility(level), true);
});

global.fetch = async filePath => {
    const jsonText = await fs.readFile(filePath, 'utf-8');
    return {
        ok: true,
        json: async () => JSON.parse(jsonText),
    };
};

test('ReachablilityJson', async () => {
    let files;
    try {
        files = await fs.readdir(levelsFolder);
    } catch (err) {
        console.error('Error reading folder:', err);
        throw err;
    }

    for (const file of files) {
        const filePath = path.join(levelsFolder, file);
        let stats;
        try {
            stats = await fs.stat(filePath);
        } catch (err) {
            console.error('Error getting file stats:', err);
            continue;
        }

        if (stats.isFile()) {
            const level = Level.create(LEVEL_TYPES_FROM_JSON, filePath);
            await level.init();
            assert.strictEqual(
                testReachablility(level),
                true,
                `Level failed: ${file}`
            );
        }
    }
});
