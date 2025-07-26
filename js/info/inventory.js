import { Info } from './info.js';
import { MushroomGreenItem } from './mushroomGreenItem.js';
import { MushroomBlueItem } from './mushroomBlueItem.js';
import { MushroomPurpleItem } from './mushroomPurpleItem.js';

export class Inventory extends Info {
    constructor() {
        super();
        this.items['greenMushroom'] = new MushroomGreenItem(0, 0);
        this.items['blueMushroom'] = new MushroomBlueItem(0, 0);
        this.items['yellowMushroom'] = new MushroomPurpleItem(0, 0);
    }

    getItems() {
        return [
            this.items.greenMushroom,
            this.items.blueMushroom,
            this.items.yellowMushroom,
        ];
    }

    addGreenMushroom() {
        this.items.greenMushroom.count++;
    }

    addBlueMushroom() {
        this.items.blueMushroom.count++;
    }

    addYellowMushroom() {
        this.items.yellowMushroom.count++;
    }

    useGreenMushroom() {
        if (this.items.greenMushroom.count > 0) {
            this.items.greenMushroom.count--;
            return true;
        }
        return false;
    }

    useBlueMushroom() {
        if (this.items.blueMushroom.count > 0) {
            this.items.blueMushroom.count--;
            return true;
        }
        return false;
    }

    useYellowMushroom() {
        if (this.items.yellowMushroom.count > 0) {
            this.items.yellowMushroom.count--;
            return true;
        }
        return false;
    }
}
