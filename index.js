"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = __importDefault(require("./src/data/index"));
var simulator_1 = __importDefault(require("./src/simulator"));
var simulator = new simulator_1["default"](10000, index_1["default"].Source.SPY_EOD_1993_2022);
simulator.tick.push(function (_a, sim) {
    var Close = _a.Close, Buy = _a.Buy;
    return test(Close, sim, Buy);
});
function test2(t) {
    t();
}
function test(Close, sim, buy) {
    if (Close > 400)
        buy();
}
simulator.run();
