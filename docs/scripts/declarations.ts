import { lorem_ipsum } from "../assets/lorem_ipsum.js";
import { split_words } from "../assets/split_words.js";

export interface TextGenerator {
    description(): string;
    generate(message: string): string;
}

export class Spongebob implements TextGenerator {
    description() {
        return "";
    }

    generate(message: string): string {
        return message.split("").map((chr: string): string => Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase()).join("");
    }
}

export class Fester implements TextGenerator {
    private content: string;

    constructor() {
        this.content = lorem_ipsum;
    }

    description() {
        return "Generates highly accurate Fester-text from any provided input.";
    }

    generate(_: string): string {
        return this.content.repeat(Math.floor(Math.random() * 100));
    }
}

export class Svarjis implements TextGenerator {
    private split: SplitWords;
    private capitalize: CapitalizeRandomly;
    private punctuate: PunctuateRandomly;
    private new_lines: AddNewLines;

    constructor() {
        this.split = new SplitWords();
        this.capitalize = new CapitalizeRandomly();
        this.punctuate = new PunctuateRandomly();
        this.new_lines = new AddNewLines();
    }

    description() {
        return "";
    }

    generate(message: string): string {
        return this.new_lines.generate(this.punctuate.generate(this.capitalize.generate(this.split.generate(message))));
    }
}


class SplitWords implements TextGenerator {
    description() {
        return "";
    }

    generate(message: string): string {
        return message
            .split(" ")
            .map((word: string): string => word in split_words ? split_words[word][Math.floor(Math.random() * split_words[word].length)] : word)
            .join(" ");
    }
}

class CapitalizeRandomly implements TextGenerator {
    private percent: number;

    constructor() {
        this.percent = 25;
    }

    description() {
        return "";
    }

    generate(message: string): string {
        return message
            .split(" ")
            .map((word: string): string => Math.floor(Math.random() * 100) < this.percent ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase())
            .join(" ");
    }
}

class PunctuateRandomly implements TextGenerator {
    private repeat_max: number;
    private punctuations: Array<string>;

    constructor() {
        this.repeat_max = 4;
        this.punctuations = [
            "!",
            "?",
            ".",
            ",",
        ];
    }

    description() {
        return "";
    }

    generate(message: string): string {
        return message
            .split("")
            .map((chr: string): string => chr in this.punctuations ? this.punctuations[Math.floor(Math.random() * this.punctuations.length)]
            .repeat(Math.floor(Math.random() * this.repeat_max)) : chr)
            .join("");
    }
}

class AddNewLines implements TextGenerator {
    percent: number;

    constructor() {
        this.percent = 10;
    }

    description() {
        return "";
    }

    generate(message: string): string {
        return message
            .split("")
            .map((chr: string): string => /\s/.test(chr) && Math.floor(Math.random() * 100) < this.percent ? '\n' : chr)
            .join("");
    }
}