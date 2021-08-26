$(() => new Index());
class Index {
    constructor() {
        this.tabs = [
            "generator",
            "transformer"
        ];
        this.initTabs();
        this.attachHTML();
        this.set_content();
    }
    initTabs() {
        const tabDiv = $("#tabs");
        for (let idx in this.tabs) {
            const page = this.tabs[idx];
            const button = document.createElement("button");
            button.id = page;
            button.textContent = page.charAt(0).toUpperCase() + page.slice(1);
            button.style.width = (100 / +this.tabs.length) + "%";
            button.classList.add("tab_link");
            tabDiv.append(button);
        }
        tabDiv.children().first().addClass("selected_tab");
    }
    attachHTML() {
        $("#ifrContent").css("top", $("#tabs").children().first().outerHeight());
        $("button.tab_link").on("click", (event) => {
            const last_ele = $("button.selected_tab");
            const new_ele = $(event.target);
            if (last_ele.attr("id") !== new_ele.attr("id")) {
                last_ele.removeClass("selected_tab");
                new_ele.addClass("selected_tab");
                this.set_content();
            }
        });
    }
    set_content() {
        const idx = this.tabs.indexOf($("#tabs > .selected_tab").attr("id"));
        $("#ifrContent").attr("src", `./${this.tabs[idx]}.html`);
    }
}
