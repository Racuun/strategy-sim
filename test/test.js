"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = __importDefault(require("../index"));
var Simulator = new index_1["default"].Simulator(10000, index_1["default"].Source.SPY_M1_2021_2022);
var i = 0;
function testFunction(Close, Balance, Buy, Sell) {
    if (Balance - Close > 1000)
        Buy();
    else {
        Sell(i);
        i++;
    }
}
Simulator.provideLogic(function (_a) {
    var Close = _a.Close, Balance = _a.Balance, Buy = _a.Buy, Sell = _a.Sell;
    return testFunction(Close, Balance, Buy, Sell);
});
Simulator.run();
