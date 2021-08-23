import { lorem_ipsum } from "../assets/lorem_ipsum.js";
import { split_words } from "../assets/split_words.js";
export class Spongebob {
    description() {
        return "";
    }
    generate(message) {
        return message.split("").map((chr) => Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase()).join("");
    }
}
export class Fester {
    constructor() {
        this.content = lorem_ipsum;
    }
    description() {
        return "Generates highly accurate Fester-text from any provided input.";
    }
    generate(_) {
        return this.content.repeat(Math.floor(Math.random() * 100));
    }
}
export class Svarjis {
    constructor() {
        this.split = new SplitWords();
        this.capitalize = new CapitalizeRandomly();
        this.punctuate = new PunctuateRandomly();
        this.new_lines = new AddNewLines();
    }
    description() {
        return "";
    }
    generate(message) {
        return this.new_lines.generate(this.punctuate.generate(this.capitalize.generate(this.split.generate(message))));
    }
}
class SplitWords {
    description() {
        return "";
    }
    generate(message) {
        return message
            .split(" ")
            .map((word) => word in split_words ? split_words[word][Math.floor(Math.random() * split_words[word].length)] : word)
            .join(" ");
    }
}
class CapitalizeRandomly {
    constructor() {
        this.percent = 25;
    }
    description() {
        return "";
    }
    generate(message) {
        return message
            .split(" ")
            .map((word) => Math.floor(Math.random() * 100) < this.percent ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase())
            .join(" ");
    }
}
class PunctuateRandomly {
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
    generate(message) {
        return message
            .split("")
            .map((word) => /[.,!?]/.test(word) ? this.punctuations[Math.floor(Math.random() * this.punctuations.length)]
            .repeat(Math.floor(Math.random() * this.repeat_max)) : word)
            .join("");
    }
}
class AddNewLines {
    constructor() {
        this.percent = 10;
    }
    description() {
        return "";
    }
    generate(message) {
        return message
            .split("")
            .map((chr) => /\s/.test(chr) && Math.floor(Math.random() * 100) < this.percent ? '\n' : chr)
            .join("");
    }
}
