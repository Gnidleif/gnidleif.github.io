import { lorem_ipsum } from "../assets/lorem_ipsum.js";

export interface TextGenerator {
    description(): string;
    generate(): string;
}

export class Fester implements TextGenerator {
    private content: string;

    constructor() {
        this.content = lorem_ipsum;
    }

    description() {
        return "Generate highly accurate Fester text";
    }

    generate(): string {
        return this.content.repeat(Math.floor(Math.random() * 100));
    }
}