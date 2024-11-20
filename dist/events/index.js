"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeEventListeners = initializeEventListeners;
const testListener_1 = require("./listeners/testListener");
function initializeEventListeners() {
    (0, testListener_1.testListener)();
}
