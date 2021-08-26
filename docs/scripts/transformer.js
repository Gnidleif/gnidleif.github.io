import { Spongebob, Svarjis } from "../declarations/transformer.js";
$(() => new Transformer());
class Transformer {
    constructor() {
        this.modes = {
            "spongebob": new Spongebob(),
            "svarjis": new Svarjis(),
        };
        this.attachHTML();
    }
    attachHTML() {
        this.add_select_modes("slcMode", this.modes);
        $("#txtInput").on("click", this.trigger_select);
        $("#txtOutput").on("click", this.trigger_select);
        $("#txtInput").on("keypress", (event) => {
            if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                $("#btnInput").trigger("click");
            }
        });
        $("#btnInput").on("click", () => {
            const mode = this.get_selected();
            if (mode) {
                const message = $("#txtInput").val();
                $("#txtOutput").val(mode.transform(message.length > 0 ? message : ""));
            }
        });
        $("#btnOutput").on("click", () => {
            const generated = $("#txtOutput").val();
            if (generated.length > 0) {
                $("#txtOutput").trigger("select");
                document.execCommand("copy");
            }
        });
        $("#btnClear").on("click", () => {
            $("#txtInput").val("");
            $("#txtOutput").val("");
            $("#txtInput").trigger("focus");
        });
        $("#slcMode").on("change", () => {
            $("#pDesc").text(this.get_selected().description());
        });
        $("#slcMode").trigger("change");
    }
    trigger_select(event) {
        $(event.target).trigger("select");
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
