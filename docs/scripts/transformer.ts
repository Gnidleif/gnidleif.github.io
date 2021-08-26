import { TextTransformer, Spongebob, Svarjis } from "../declarations/transformer.js";

$(() => new Transformer());
class Transformer {
    private modes: { [key: string]: TextTransformer }

    constructor() {
        this.modes = {
            "spongebob": new Spongebob(),
            "svarjis": new Svarjis(),
        };
        this.attachHTML();
    }

    private attachHTML(): void {
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
            const mode: TextTransformer = this.get_selected();
            if (mode) {
                const message: string = $("#txtInput").val() as string;
                $("#txtOutput").val(mode.transform(message.length > 0 ? message : ""));
            }
        });

        $("#btnOutput").on("click", () => {
            const generated: string = $("#txtOutput").val() as string;
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

    private trigger_select(event: JQuery.ClickEvent): void {
        $(event.target).trigger("select");
    }

    private add_select_modes(id: string, selection: { [key:string]: any }): void {
        const dropdown = $(`#${id}`);
        for (let key in selection) {
            const option: HTMLOptionElement = document.createElement("option");
            option.value = key;
            option.text = key.charAt(0).toUpperCase() + key.slice(1);
            dropdown.append(option);
        }
    }

    private get_selected(): TextTransformer {
        const key: string = $("#slcMode :selected").val() as string;
        if (key.length > 0) {
            return this.modes[key];
        }
    }
}