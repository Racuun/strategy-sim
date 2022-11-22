"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var data_1 = __importDefault(require("./data"));
var position_1 = __importDefault(require("./position"));
var Simulator = /** @class */ (function () {
    function Simulator(startingBalance, source) {
        this.positions = [];
        this.positionsCount = 0;
        this.currTick = 0;
        this.error = false;
        this.logic = [];
        this.balance = this.startingBalance = startingBalance;
        this.data = data_1["default"].getData(source);
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
        var temp = new position_1["default"](this.positionsCount, price);
        var idx = temp.index;
        this.positions.push(temp);
        this.positionsCount++;
        this.balance -= price;
        this.log("Position " + idx + " opened at price: " + price + ", currnet balance: " + this.balance);
        return idx;
    };
    Simulator.prototype.sell = function (index) {
        var price = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close)) / 2;
        if (this.positions[index].isClosed) {
            this.elog("Trying to close position that was already closed", 2);
            return;
        }
        this.positions[index].close(price);
        this.balance += price;
        this.log("Position " + index + " was closed at price: " + price + ", current balance: " + this.balance);
    };
    Simulator.prototype.provideLogic = function () {
        var logic = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            logic[_i] = arguments[_i];
        }
        for (var i = 0; i < logic.length; i++)
            this.logic.push(logic[i]);
    };
    Simulator.prototype.onTick = function (tick) {
        var _this = this;
        for (var j = 0; j < this.logic.length; j++) {
            this.logic[j]({
                Open: parseFloat(this.data[tick].Open),
                Close: parseFloat(this.data[tick].Close),
                Volume: parseFloat(this.data[tick].Volume),
                Balance: this.balance,
                Buy: function () { return _this.buy(); },
                Sell: function (index) { return _this.sell(index); }
            });
        }
    };
    Simulator.prototype.onFinish = function () {
        var fBalance = this.balance;
        for (var i = 0; i < this.positions.length; i++) {
            if (!this.positions[i].isClosed)
                fBalance += this.data[this.currTick].Close;
        }
        console.log("Simulation finished!" +
            "\n -> balance: " + fBalance +
            "\n -> change%: " + (((fBalance / this.startingBalance) * 100) - 100) + "%" +
            "\n -> positions opened: " + this.positionsCount);
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
        this.onFinish();
    };
    return Simulator;
}());
exports["default"] = Simulator;
