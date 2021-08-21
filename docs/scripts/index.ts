class GillmanGenerator {
    test: string;

    constructor(message: string) {
        this.test = message;
    }

    greet() {
        return "The message: " + this.test;
    }
}