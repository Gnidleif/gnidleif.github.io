"use strict";
var GillmanGenerator = /** @class */ (function () {
    function GillmanGenerator(message) {
        this.test = message;
    }
    GillmanGenerator.prototype.greet = function () {
        return "The message: " + this.test;
    };
    return GillmanGenerator;
}());
