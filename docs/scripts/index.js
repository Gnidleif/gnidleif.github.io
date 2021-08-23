import { Svarjis, Spongebob, Fester } from "./declarations.js";
$(() => new Index());
class Index {
    constructor() {
        this.modes = {
            "svärjevän": new Svarjis(),
            "spongebob": new Spongebob(),
            "fester": new Fester(),
        };
        this.initHTML();
    }
    initHTML() {
        $("#input_text").on("click", (event) => $(event.target).trigger("select"));
        $("#output_text").on("click", (event) => $(event.target).trigger("select"));
        $("#input_text").on("keypress", (event) => {
            if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                $("#input_button").trigger("click");
            }
        });
        $("#input_button").on("click", () => {
            const key = $("#select_mode :selected").val();
            if (key in this.modes) {
                const message = $("#input_text").val();
                if (message.length > 0) {
                    $("#output_text").val(this.modes[key].generate(message));
                }
                else {
                    $("#output_text").val("");
                }
            }
        });
        $("#output_button").on("click", () => {
            const generated = $("#output_text").val();
            if (generated.length > 0) {
                $("#output_text").trigger("select");
                document.execCommand("copy");
            }
        });
        const dropdown = $("#select_mode");
        for (let key in this.modes) {
            const option = document.createElement("option");
            option.value = key;
            option.text = key.charAt(0).toUpperCase() + key.slice(1);
            dropdown.append(option);
        }
    }
}
