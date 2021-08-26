import { split_words } from "../assets/split_words.js";

export interface TextTransformer {
    description(): string;
    transform(message: string): string;
}

export class Spongebob implements TextTransformer {
    description() {
        return "transFOrM ANY tExt inTO AWEsOme SPoNgebOB TEXt";
    }

    transform(message: string): string {
        return message.split("").map((chr: string): string => Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase()).join("");
    }
}


export class Svarjis implements TextTransformer {
    private capitalize_chance: number;
    private lines_chance: number;
    private repeat_max: number;
    private punctuations: Array<string>;

    constructor() {
        this.capitalize_chance = 25;
        this.repeat_max = 4;
        this.punctuations = [
            "!",
            "?",
            ".",
            ",",
        ];
    }

    description() {
        return "Transform any text into the style of a highly gifted swede";
    }

    transform(message: string): string {
        return this.add_lines(this.punctuate(this.capitalize(this.split(message))));
    }

    private split(message: string): string {
        return message
            .split(" ")
            .map((word: string): string => word in split_words ? split_words[word][Math.floor(Math.random() * split_words[word].length)] : word)
            .join(" ");
    }

    private capitalize(message: string): string {
        return message
            .split(" ")
            .map((word: string): string => Math.floor(Math.random() * 100) < this.capitalize_chance ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase())
            .join(" ");
    }

    private punctuate(message: string): string {
        return message
            .split("")
            .map((chr: string): string => chr in this.punctuations ? this.punctuations[Math.floor(Math.random() * this.punctuations.length)]
            .repeat(Math.floor(Math.random() * this.repeat_max)) : chr)
            .join("");
    }

    private add_lines(message: string): string {
        return message
            .split("")
            .map((chr: string): string => /\s/.test(chr) && Math.floor(Math.random() * 100) < this.lines_chance ? '\n' : chr)
            .join("");
    }
}