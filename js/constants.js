export const PIXEL_SIZE = 4;

export const GAME_WIDTH = 160;
export const GAME_HEIGHT = 128;

export const INFO_ITEM_WIDTH = 12;
export const INFO_ITEM_HEIGHT = 12;

export const BONUS_WIDTH = 8;
export const BONUS_HEIGHT = 8;

export const ENEMY_WIDTH = 8;
export const ENEMY_HEIGHT = 8;

export const LIGHT_WIDTH = 16;
export const LIGHT_HEIGHT = 16;

export const BLOCK_WIDTH = 8;
export const BLOCK_HEIGHT = 8;

export const STEP = 1;

//TODO: align to difficulty or do smth with it to make the game playable

export const ENEMY_HP_SCALE = 1.2;
export const ENEMY_POWER_SCALE = 1.2;
export const ENEMY_ARMOR_SCALE = 1.2;

export const ENEMY_LEECH_HP = 40;
export const ENEMY_LEECH_POWER = 10;
export const ENEMY_LEECH_ARMOR = 0;

export const ENEMY_ORB_HP = 30;
export const ENEMY_ORB_POWER = 15;
export const ENEMY_ORB_ARMOR = 0;

export const ENEMY_SLUG_HP = 20;
export const ENEMY_SLUG_POWER = 20;
export const ENEMY_SLUG_ARMOR = 0;

export const PLAYER_WIDTH = 8;
export const PLAYER_HEIGHT = 8;
export const PLAYER_ARMOR_MOD = 2;
export const PLAYER_HP_MOD = 10;
export const PLAYER_POWER_MOD = 2;
export const PLAYER_ARMOR_MIN = 15;

export const W_CODE = 87;
export const A_CODE = 65;
export const S_CODE = 83;
export const D_CODE = 68;

export const KEY_ITEM_1 = ['q', 'Q', 'й', 'Й'];
export const KEY_ITEM_2 = ['w', 'W', 'ц', 'Ц'];
export const KEY_ITEM_3 = ['e', 'E', 'у', 'У'];

export const KEY_UP = ['ArrowUp'];
export const KEY_DOWN = ['ArrowDown'];
export const KEY_LEFT = ['ArrowLeft'];
export const KEY_RIGHT = ['ArrowRight'];

export const GREEN_MUSHROOM = 'green_mushroom';
export const BLUE_MUSHROOM = 'blue_mushroom';
export const PURPLE_MUSHROOM = 'purple_mushroom';

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
    'lumen/light-green.svg',
    'lumen/light-blue.svg',
    'lumen/light-purple.svg',
    'lumen/light-yellow.svg',
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
    'shadow/orb1.svg',
    'shadow/orb2.svg',
    'shadow/orb3.svg',
    'shadow/orb4.svg',
    'shadow/orb5.svg',
    'shadow/orb6.svg',
    'shadow/leech1.svg',
    'shadow/leech2.svg',
    'shadow/leech3.svg',
    'shadow/leech4.svg',
    'shadow/leech5.svg',
    'shadow/leech6.svg',
    'shadow/slug1.svg',
    'shadow/slug2.svg',
    'shadow/slug3.svg',
    'shadow/slug4.svg',
    'shadow/slug5.svg',
    'shadow/slug6.svg',
    'shadow/slug7.svg',
    'shadow/slug8.svg',
    'mushroom-green.svg',
    'mushroom-purple.svg',
    'mushroom-blue.svg',
    'hp.svg',
    'lvl.svg',
    'exp.svg',
];

export const LIGHT_SPRITES = {
    green: 'lumen/light-green.svg',
    yellow: 'lumen/light-yellow.svg',
    blue: 'lumen/light-blue.svg',
    purple: 'lumen/light-purple.svg',
};

export const MUSHROOM_SPRITES = {
    green: 'mushroom-green.svg',
    purple: 'mushroom-purple.svg',
    blue: 'mushroom-blue.svg',
};

export const INFO_SPRITES = {
    hp: 'hp.svg',
    lvl: 'lvl.svg',
    exp: 'exp.svg',
};

export const PLAYER_SPRITES = {
    left: [
        'lumen/lumen-left1.svg',
        'lumen/lumen-left2.svg',
        'lumen/lumen-left3.svg',
        'lumen/lumen-left4.svg',
    ],
    up: [
        'lumen/lumen-up1.svg',
        'lumen/lumen-up2.svg',
        'lumen/lumen-up3.svg',
        'lumen/lumen-up4.svg',
    ],
    right: [
        'lumen/lumen-right1.svg',
        'lumen/lumen-right2.svg',
        'lumen/lumen-right3.svg',
        'lumen/lumen-right4.svg',
    ],
    down: [
        'lumen/lumen-down1.svg',
        'lumen/lumen-down2.svg',
        'lumen/lumen-down3.svg',
        'lumen/lumen-down4.svg',
    ],
};

export const LEVEL_TYPES_RANDOM = 'random';
export const LEVEL_TYPES_FROM_JSON = 'fromJSON';
export const LEVEL_TYPES_TEST = 'test';

export const ENEMY_SPRITES = {
    orb: [
        'shadow/orb1.svg',
        'shadow/orb2.svg',
        'shadow/orb3.svg',
        'shadow/orb4.svg',
        'shadow/orb5.svg',
        'shadow/orb6.svg',
    ],
    leech: [
        'shadow/leech1.svg',
        'shadow/leech2.svg',
        'shadow/leech3.svg',
        'shadow/leech4.svg',
        'shadow/leech5.svg',
        'shadow/leech6.svg',
    ],
    slug: [
        'shadow/slug1.svg',
        'shadow/slug2.svg',
        'shadow/slug3.svg',
        'shadow/slug4.svg',
        'shadow/slug5.svg',
        'shadow/slug6.svg',
        'shadow/slug7.svg',
        'shadow/slug8.svg',
    ],
};
