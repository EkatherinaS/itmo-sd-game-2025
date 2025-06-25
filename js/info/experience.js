import { ExpItem } from './expItem.js';
import { HpItem } from './hpItem.js';
import { Info } from './info.js';
import { LvlItem } from './lvlItem.js';

export class Experience extends Info {
    constructor(player) {
        super();
        this.player = player;
        this.items['lvl'] = new LvlItem(0, 0);
        this.items['hp'] = new HpItem(0, 0);
        this.items['exp'] = new ExpItem(0, 0);

        this.items.lvl.count = 1;
        this.items.exp.count = 0;
        this.items.hp.count = this.player.hp;
    }

    getItems() {
        return [this.items.lvl, this.items.hp, this.items.exp];
    }

    addLvl() {
        this.items.exp.count = 0;
        this.items.lvl.count++;
        this.player.updateLvl(this.items.lvl.count);
    }

    addExp(count) {
        this.items.exp.count += count;
        if (Math.random() * this.items.lvl.count * 5 < this.items.exp.count) {
            this.addLvl();
        }
    }

    updateHp() {
        this.items.hp.count = this.player.hp;
    }
}
