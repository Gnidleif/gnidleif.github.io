import { lorem_ipsum } from "../assets/lorem_ipsum.js";
export class Fester {
    constructor() {
        this.content = lorem_ipsum;
    }
    description() {
        return "Generate highly accurate Fester text";
    }
    generate() {
        return this.content.repeat(Math.floor(Math.random() * 100));
    }
}
