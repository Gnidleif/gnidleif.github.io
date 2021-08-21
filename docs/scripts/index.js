"use strict";
class Index {
    constructor() {
        this.modes = {};
        this.modes["spongebob"] = new Spongebob();
        this.modes["fester"] = new Fester();
        this.InitHTML();
    }
    InitHTML() {
        $("#input_button").on("click", () => {
            let key = $("#select_mode :selected").val();
            let message = $("#input_text").val();
            if (message.length > 0) {
                $("#output_text").val(this.modes[key].generate(message));
            }
            else {
                $("#output_text").val("");
            }
        });
        $("#output_button").on("click", () => {
            let generated = $("#output_text").val();
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
    SpongeBob(message) {
        return message.split('').map((chr) => Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase()).join('');
    }
}
class Spongebob {
    constructor() {
    }
    generate(message) {
        return message.split('').map((chr) => Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase()).join('');
    }
}
class Fester {
    constructor() {
    }
    generate(message) {
        let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        return text.repeat(Math.floor(Math.random() * 10));
    }
}
