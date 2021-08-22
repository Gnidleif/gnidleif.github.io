"use strict";
var Index = /** @class */ (function () {
    function Index() {
        this.modes = {
            "svärjevän": new ShitGrammar(),
            "spongebob": new Spongebob(),
            "split words": new SplitWords(),
            "capitalize randomly": new CapitalizeRandomly(),
            "punctuate randomly": new PunctuateRandomly(),
            "random new lines": new AddNewLines(),
            "fester": new Fester(),
        };
        this.initHTML();
    }
    Index.prototype.initHTML = function () {
        var _this = this;
        var trigger_select = function (event) {
            $(event.target).trigger("select");
        };
        $("#input_text").on("click", trigger_select);
        $("#output_text").on("click", trigger_select);
        $("#input_text").on("keypress", function (event) {
            if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                $("#input_button").trigger("click");
            }
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
        return message.split("").map(function (chr) { return Math.floor(Math.random() * 2) % 2 === 0 ? chr.toUpperCase() : chr.toLowerCase(); }).join("");
    };
    return Spongebob;
}());
var Fester = /** @class */ (function () {
    function Fester() {
        this.content = lorem_ipsum;
    }
    Fester.prototype.generate = function (message) {
        return this.content.repeat(Math.floor(Math.random() * 100));
    };
    return Fester;
}());
var SplitWords = /** @class */ (function () {
    function SplitWords() {
    }
    SplitWords.prototype.generate = function (message) {
        return message
            .split(" ")
            .map(function (word) { return word in split_words ? split_words[word][Math.floor(Math.random() * split_words[word].length)] : word; })
            .join(" ");
    };
    return SplitWords;
}());
var CapitalizeRandomly = /** @class */ (function () {
    function CapitalizeRandomly() {
        this.percent = 25;
    }
    CapitalizeRandomly.prototype.generate = function (message) {
        var _this = this;
        return message
            .split(" ")
            .map(function (word) { return Math.floor(Math.random() * 100) < _this.percent ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase(); })
            .join(" ");
    };
    return CapitalizeRandomly;
}());
var PunctuateRandomly = /** @class */ (function () {
    function PunctuateRandomly() {
        this.repeat_max = 4;
        this.punctuations = [
            "!",
            "?",
            ".",
            ",",
        ];
    }
    PunctuateRandomly.prototype.generate = function (message) {
        var _this = this;
        return message
            .split("")
            .map(function (word) { return /[.,!?]/.test(word) ? _this.punctuations[Math.floor(Math.random() * _this.punctuations.length)]
            .repeat(Math.floor(Math.random() * _this.repeat_max)) : word; })
            .join("");
    };
    return PunctuateRandomly;
}());
var ShitGrammar = /** @class */ (function () {
    function ShitGrammar() {
        this.split = new SplitWords();
        this.capitalize = new CapitalizeRandomly();
        this.punctuate = new PunctuateRandomly();
        this.new_lines = new AddNewLines();
    }
    ShitGrammar.prototype.generate = function (message) {
        return this.new_lines.generate(this.punctuate.generate(this.capitalize.generate(this.split.generate(message))));
    };
    return ShitGrammar;
}());
var AddNewLines = /** @class */ (function () {
    function AddNewLines() {
        this.percent = 10;
    }
    AddNewLines.prototype.generate = function (message) {
        var _this = this;
        return message
            .split("")
            .map(function (chr) { return /\s/.test(chr) && Math.floor(Math.random() * 100) < _this.percent ? '\n' : chr; })
            .join("");
    };
    return AddNewLines;
}());
