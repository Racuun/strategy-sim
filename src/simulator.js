"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = __importDefault(require("./data/index"));
var position = /** @class */ (function () {
    function position(_index, price) {
        this.closePrice = undefined;
        this.percentage = undefined;
        this.closed = false;
        this.index = _index;
        this.openPrice = price;
    }
    position.prototype.close = function (price) {
        this.closePrice = price;
        this.percentage = (this.closePrice / this.openPrice * 100);
        this.closed = true;
    };
    return position;
}());
var Simulator = /** @class */ (function () {
    function Simulator(startingBalance, source) {
        this.positions = [];
        this.positionsCount = 0;
        this.currTick = 0;
        this.error = false;
        this.tick = [];
        this.balance = startingBalance;
        this.data = index_1["default"].getData(source);
    }
    Simulator.prototype.log = function (str) {
        console.log("[" + this.currTick + "]: " + str);
    };
    Simulator.prototype.elog = function (str, level) {
        console.log("[" + this.currTick + "]: ERROR: " + str + " //ERROR L" + level);
        this.error = true;
    };
    Simulator.prototype.buy = function () {
        var price = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close)) / 2;
        if (this.balance - price < 0) {
            this.elog("trying to buy without money", 2);
            return;
        }
        var temp = new position(this.positionsCount, price);
        var idx = temp.index;
        this.positions.push(temp);
        this.positionsCount++;
        this.balance -= price;
        this.log("Position " + idx + " opened at price: " + price + ", currnet balance: " + this.balance);
        return idx;
    };
    Simulator.prototype.sell = function (index) {
        var price = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close)) / 2;
        if (!this.positions[index].closed) {
            this.elog("Trying to close position that was already closed", 2);
            return;
        }
        this.positions[index].close(price);
        this.balance += price;
    };
    Simulator.prototype.onTick = function (tick) {
        var _this = this;
        for (var j = 0; j < this.tick.length; j++) {
            this.tick[j]({
                Open: parseFloat(this.data[tick].Open),
                Close: parseFloat(this.data[tick].Close),
                Volume: parseFloat(this.data[tick].Volume),
                Balance: this.balance,
                Buy: function () { return _this.buy(); }
            }, this);
        }
    };
    Simulator.prototype.run = function () {
        if (this.data == undefined) {
            this.elog("Data undefined", 0);
            return;
        }
        for (var i = 0; i < this.data.length; i++) {
            this.currTick = i;
            if (this.error)
                return;
            this.onTick(i);
        }
    };
    return Simulator;
}());
exports["default"] = Simulator;
