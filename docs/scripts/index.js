"use strict";
var Index = /** @class */ (function () {
    function Index() {
        this.modes = {
            "spongebob": new Spongebob(),
            "fester": new Fester(),
        };
        this.InitHTML();
    }
    Index.prototype.InitHTML = function () {
        var _this = this;
        $("#input_text").on("click", function () {
            $("#input_text").trigger("select");
        });
        $("#input_button").on("click", function () {
            var key = $("#select_mode :selected").val();
            var message = $("#input_text").val();
            if (message.length > 0) {
                $("#output_text").val(_this.modes[key].generate(message));
            }
            else {
                $("#output_text").val("");
            }
        });
        $("#output_button").on("click", function () {
            var generated = $("#output_text").val();
            if (generated.length > 0) {
                $("#output_text").trigger("select");
                document.execCommand("copy");
            }
        });
        var dropdown = $("#select_mode");
        for (var key in this.modes) {
            dropdown.append("<option value='" + key + "'>" + key.charAt(0).toUpperCase() + key.slice(1) + "</option>");
        }
    };
    return Index;
}());
var Spongebob = /** @class */ (function () {
    function Spongebob() {
    }
    Spongebob.prototype.generate = function (message) {
        return message.split('').map(function (chr) { return Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase(); }).join('');
    };
    return Spongebob;
}());
var Fester = /** @class */ (function () {
    function Fester() {
    }
    Fester.prototype.generate = function (message) {
        var content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        return content.repeat(Math.floor(Math.random() * 100));
    };
    return Fester;
}());
