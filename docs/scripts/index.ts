$(() => new Index());
class Index {
    private tabs: Array<string> = [
        "generator",
        "transformer",
        "markov"
    ]

    constructor() {
        this.initTabs();
        this.attachHTML();
        this.set_content();
    }

    private initTabs(): void {
        const tabDiv: JQuery<HTMLDivElement> = $("#tabs");
        for (let idx in this.tabs) {
            const page: string = this.tabs[idx];
            const button: HTMLButtonElement = document.createElement("button");
            button.id = page;
            button.textContent = page.charAt(0).toUpperCase() + page.slice(1);
            button.style.width = (100 / +this.tabs.length) + "%";
            button.classList.add("tab_link");
            tabDiv.append(button);
        }
        tabDiv.children().first().addClass("selected_tab");
    }

    private attachHTML(): void {
        $("#ifrContent").css("top", $("#tabs").children().first().outerHeight());

        $("button.tab_link").on("click", (event: JQuery.ClickEvent) => {
            const last_ele: JQuery<HTMLElement> = $("button.selected_tab");
            const new_ele: JQuery<HTMLElement> = $(event.target);
            if (last_ele.attr("id") !== new_ele.attr("id")) {
                last_ele.removeClass("selected_tab");
                new_ele.addClass("selected_tab");
                this.set_content();
            }
        });
    }

    private set_content(): void {
        const idx: number = this.tabs.indexOf($("#tabs > .selected_tab").attr("id"));
        $("#ifrContent").attr("src", `./${this.tabs[idx]}.html`);
    }
}