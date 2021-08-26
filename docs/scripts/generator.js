import { Fester } from "../declarations/generator.js";
$(() => new Generator());
class Generator {
    constructor() {
        this.modes = {
            "fester": new Fester(),
        };
        this.attachHTML();
    }
    attachHTML() {
        this.add_select_modes("slcMode", this.modes);
        $("#slcMode").on("change", () => {
            $("#pDesc").text(this.get_selected().description());
        });
        $("#slcMode").trigger("change");
        $("#btnInput").on("click", () => {
            const mode = this.get_selected();
            if (mode) {
                $("#txtOutput").val(mode.generate());
            }
        });
        $("#btnCopy").on("click", () => {
            const generated = $("#txtOutput").val();
            if (generated.length > 0) {
                $("#txtOutput").trigger("select");
                document.execCommand("copy");
            }
        });
        $("#btnClear").on("click", () => {
            $("#txtOutput").val("");
        });
    }
    add_select_modes(id, selection) {
        const dropdown = $(`#${id}`);
        for (let key in selection) {
            const option = document.createElement("option");
            option.value = key;
            option.text = key.charAt(0).toUpperCase() + key.slice(1);
            dropdown.append(option);
        }
    }
    get_selected() {
        const key = $("#slcMode :selected").val();
        if (key.length > 0) {
            return this.modes[key];
        }
    }
}
