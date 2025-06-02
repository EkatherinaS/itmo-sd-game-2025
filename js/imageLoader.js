import * as CONST from "./constants.js"

export class ImageLoader {

    static instance;

    constructor() {
        if (ImageLoader.instance) return ImageLoader.instance;
        ImageLoader.instance = this;
        this.images = {};
        this.#load();
    }

    #load() {
        CONST.IMAGES.forEach(name => {
            const img = new Image();
            img.src = `images/${name}`;
            this.images[name] = img;
        });
    }

    get(name) {
        return this.images[name];
    }
}