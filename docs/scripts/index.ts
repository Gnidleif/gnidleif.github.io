class Index {
    modes: { [key: string]: TextGenerator };

    constructor() {
        this.modes = {
            "svärjevän": new ShitGrammar(),
            "spongebob": new Spongebob(),
            "split words": new SplitWords(),
            "capitalize randomly": new CapitalizeRandomly(),
            "punctuate randomly": new PunctuateRandomly(),
            "random new lines": new AddNewLines(),
            "fester": new Fester(),
        };

        this.initHTML();
    }

    initHTML(): void {
        const trigger_select = (event: JQuery.ClickEvent) => {
            $(event.target).trigger("select");
        }

        $("#input_text").on("click", trigger_select);
        $("#output_text").on("click", trigger_select);

        $("#input_text").on("keypress", (event) => {
            if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                $("#input_button").trigger("click");
            }
        });

        $("#input_button").on("click", () => {
            const key: string = $("#select_mode :selected").val() as string;
            const message: string = $("#input_text").val() as string;
            if (message.length > 0) {
                $("#output_text").val(this.modes[key].generate(message));
            }
            else {
                $("#output_text").val("");
            }
        });

        $("#output_button").on("click", () => {
            const generated: string = $("#output_text").val() as string;
            if (generated.length > 0) {
                $("#output_text").trigger("select");
                document.execCommand("copy");
            }
        });

        const dropdown = $("#select_mode");
        for (let key in this.modes) {
            dropdown.append("<option value='" + key + "'>" + key.charAt(0).toUpperCase() + key.slice(1) + "</option>");
        }
    }
}

interface TextGenerator {
    generate(message: string): string;
}

class Spongebob implements TextGenerator {
    generate(message: string): string {
        return message.split("").map((chr) => Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase()).join("");
    }
}

class Fester implements TextGenerator {
    content: string;

    constructor() {
        this.content = lorem_ipsum;
    }

    generate(message: string): string {
        return this.content.repeat(Math.floor(Math.random() * 100));
    }
}

class SplitWords implements TextGenerator {
    generate(message: string): string {
        return message
            .split(" ")
            .map((word) => word in split_words ? split_words[word][Math.floor(Math.random() * split_words[word].length)] : word)
            .join(" ");
    }
}

class CapitalizeRandomly implements TextGenerator {
    percent: number;

    constructor() {
        this.percent = 25;
    }

    generate(message: string): string {
        return message
            .split(" ")
            .map((word) => Math.floor(Math.random() * 100) < this.percent ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase())
            .join(" ");
    }
}

class PunctuateRandomly implements TextGenerator {
    repeat_max: number;
    punctuations: Array<string>;

    constructor() {
        this.repeat_max = 4;
        this.punctuations = [
            "!",
            "?",
            ".",
            ",",
        ];
    }

    generate(message: string): string {
        return message
            .split("")
            .map((word) => /[.,!?]/.test(word) ? this.punctuations[Math.floor(Math.random() * this.punctuations.length)]
            .repeat(Math.floor(Math.random() * this.repeat_max)) : word)
            .join("");
    }
}

class ShitGrammar implements TextGenerator {
    split: SplitWords;
    capitalize: CapitalizeRandomly;
    punctuate: PunctuateRandomly;
    new_lines: AddNewLines;

    constructor() {
        this.split = new SplitWords();
        this.capitalize = new CapitalizeRandomly();
        this.punctuate = new PunctuateRandomly();
        this.new_lines = new AddNewLines();
    }

    generate(message: string): string {
        return this.new_lines.generate(this.punctuate.generate(this.capitalize.generate(this.split.generate(message))));
    }
}

class AddNewLines implements TextGenerator {
    percent: number;

    constructor() {
        this.percent = 10;
    }

    generate(message: string): string {
        return message
            .split("")
            .map((chr) => /\s/.test(chr) && Math.floor(Math.random() * 100) < this.percent ? '\n' : chr)
            .join("");
    }
}