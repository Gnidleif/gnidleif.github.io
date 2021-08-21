class Index {
    modes: { [key: string]: TextGenerator };

    constructor() {
        this.modes = {
            "spongebob": new Spongebob(),
            "fester": new Fester(),
        };

        this.InitHTML();
    }

    InitHTML(): void {
        $("#input_text").on("click", () => {
            $("#input_text").trigger("select");
        });

        $("#input_button").on("click", () => {
            let key: string = $("#select_mode :selected").val() as string;
            let message: string = $("#input_text").val() as string;
            if (message.length > 0) {
                $("#output_text").val(this.modes[key].generate(message));
            }
            else {
                $("#output_text").val("");
            }
        });

        $("#output_button").on("click", () => {
            let generated: string = $("#output_text").val() as string;
            if (generated.length > 0) {
                $("#output_text").trigger("select");
                document.execCommand("copy");
            }
        });

        var dropdown = $("#select_mode");
        for (let key in this.modes) {
            dropdown.append("<option value='" + key + "'>" + key.charAt(0).toUpperCase() + key.slice(1) + "</option>");
        }
    }
}

interface TextGenerator {
    generate(message: string): string;
}

class Spongebob implements TextGenerator {
    constructor() {
    }

    generate(message: string): string {
        return message.split('').map((chr) => Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase()).join('');
    }
}

class Fester implements TextGenerator {
    constructor() {
    }

    generate(message: string): string {
        let content: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        return content.repeat(Math.floor(Math.random() * 100));
    }
}