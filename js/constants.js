export const PIXEL_SIZE = 4;

export const GAME_WIDTH = 160;
export const GAME_HEIGHT = 120;

export const ENEMY_WIDTH = 8;
export const ENEMY_HEIGHT = 8;

export const PLAYER_WIDTH = 7;
export const PLAYER_HEIGHT = 8;

export const LIGHT_WIDTH = 16;
export const LIGHT_HEIGHT = 16;

export const BLOCK_WIDTH = 8;
export const BLOCK_HEIGHT = 8;

export const STEP = 2;

export const W_CODE = 87;
export const A_CODE = 65;
export const S_CODE = 83;
export const D_CODE = 68;

export const KEY_UP = ['w', 'W', 'ArrowUp'];
export const KEY_DOWN = ['s', 'S', 'ArrowDown'];
export const KEY_LEFT = ['a', 'A', 'ArrowLeft'];
export const KEY_RIGHT = ['d', 'D', 'ArrowRight'];

export const MOVE_LEFT = 'left';
export const MOVE_RIGHT = 'right';
export const MOVE_UP = 'up';
export const MOVE_DOWN = 'down';
export const KEY_SPACE = 'space';

export const IMAGES = [
    'block.svg',
    'entry.svg',
    'exit.svg',
    'debug.svg',
    'lumen/lumen-left1.svg',
    'lumen/lumen-left2.svg',
    'lumen/lumen-left3.svg',
    'lumen/lumen-left4.svg',
    'lumen/lumen-up1.svg',
    'lumen/lumen-up2.svg',
    'lumen/lumen-up3.svg',
    'lumen/lumen-up4.svg',
    'lumen/lumen-right1.svg',
    'lumen/lumen-right2.svg',
    'lumen/lumen-right3.svg',
    'lumen/lumen-right4.svg',
    'lumen/lumen-down1.svg',
    'lumen/lumen-down2.svg',
    'lumen/lumen-down3.svg',
    'lumen/lumen-down4.svg',
];
export const PLAYER_SPRITES = {
    "left": ["lumen/lumen-left1.svg", "lumen/lumen-left2.svg", "lumen/lumen-left3.svg", "lumen/lumen-left4.svg"],
    "up": ["lumen/lumen-up1.svg", "lumen/lumen-up2.svg", "lumen/lumen-up3.svg", "lumen/lumen-up4.svg"],
    "right": ["lumen/lumen-right1.svg", "lumen/lumen-right2.svg", "lumen/lumen-right3.svg", "lumen/lumen-right4.svg"],
    "down": ["lumen/lumen-down1.svg", "lumen/lumen-down2.svg", "lumen/lumen-down3.svg", "lumen/lumen-down4.svg"]
}

export const LEVEL_TYPES = {
    RANDOM: 'random',
    FROM_JSON: 'fromJSON',
    TEST: 'test'
};
