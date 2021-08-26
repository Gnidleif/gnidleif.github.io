import { TextGenerator, Fester } from "../declarations/generator.js";

$(() => new Generator());
class Generator {
    private modes: { [key: string]: TextGenerator }

    constructor() {
        this.modes = {
            "fester": new Fester(),
        };
        this.attachHTML();
    }

    private attachHTML(): void {
        this.add_select_modes("slcMode", this.modes);
        $("#slcMode").on("change", () => {
            $("#pDesc").text(this.get_selected().description());
        });
        $("#slcMode").trigger("change");

        $("#btnInput").on("click", () => {
            const mode: TextGenerator = this.get_selected();
            if (mode) {
                $("#txtOutput").val(mode.generate());
            }
        });

        $("#btnCopy").on("click", () => {
            const generated: string = $("#txtOutput").val() as string;
            if (generated.length > 0) {
                $("#txtOutput").trigger("select");
                document.execCommand("copy");
            }
        });

        $("#btnClear").on("click", () => {
            $("#txtOutput").val("");
        });
    }

    private add_select_modes(id: string, selection: {[key: string]: any}): void {
        const dropdown = $(`#${id}`);
        for (let key in selection) {
            const option: HTMLOptionElement = document.createElement("option");
            option.value = key;
            option.text = key.charAt(0).toUpperCase() + key.slice(1);
            dropdown.append(option);
        }
    }

    private get_selected(): TextGenerator {
        const key: string = $("#slcMode :selected").val() as string;
        if (key.length > 0) {
            return this.modes[key];
        }
    }
}