import { TextGenerator, Svarjis, Spongebob, Fester } from "./declarations.js";

$(() => new Index());
class Index {
    private modes: { [key: string]: TextGenerator };

    constructor() {
        this.modes = {
            "svärjevän": new Svarjis(),
            "spongebob": new Spongebob(),
            "fester": new Fester(),
        };

        this.initHTML();
    }

    private initHTML(): void {
        $("#input_text").on("click", (event: JQuery.ClickEvent) => $(event.target).trigger("select"));
        $("#output_text").on("click", (event: JQuery.ClickEvent) => $(event.target).trigger("select"));

        $("#input_text").on("keypress", (event) => {
            if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                $("#input_button").trigger("click");
            }
        });

        $("#input_button").on("click", () => {
            const key: string = $("#select_mode :selected").val() as string;
            if (key in this.modes) {
                const message: string = $("#input_text").val() as string;
                if (message.length > 0) {
                    $("#output_text").val(this.modes[key].generate(message));
                }
                else {
                    $("#output_text").val("");
                }
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
            const option: HTMLOptionElement = document.createElement("option");
            option.value = key;
            option.text = key.charAt(0).toUpperCase() + key.slice(1);
            dropdown.append(option);
        }
    }
}