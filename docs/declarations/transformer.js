import { split_words } from "../assets/split_words.js";
export class Spongebob {
    description() {
        return "transFOrM ANY tExt inTO AWEsOme SPoNgebOB TEXt";
    }
    transform(message) {
        return message.split("").map((chr) => Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase()).join("");
    }
}
export class Svarjis {
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
    transform(message) {
        return this.add_lines(this.punctuate(this.capitalize(this.split(message))));
    }
    split(message) {
        return message
            .split(" ")
            .map((word) => word in split_words ? split_words[word][Math.floor(Math.random() * split_words[word].length)] : word)
            .join(" ");
    }
    capitalize(message) {
        return message
            .split(" ")
            .map((word) => Math.floor(Math.random() * 100) < this.capitalize_chance ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase())
            .join(" ");
    }
    punctuate(message) {
        return message
            .split("")
            .map((chr) => chr in this.punctuations ? this.punctuations[Math.floor(Math.random() * this.punctuations.length)]
            .repeat(Math.floor(Math.random() * this.repeat_max)) : chr)
            .join("");
    }
    add_lines(message) {
        return message
            .split("")
            .map((chr) => /\s/.test(chr) && Math.floor(Math.random() * 100) < this.lines_chance ? '\n' : chr)
            .join("");
    }
}
