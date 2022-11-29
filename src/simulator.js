"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var data_1 = require("./data");
var position_1 = __importDefault(require("./position"));
var Simulator = /** @class */ (function () {
    function Simulator(startingBalance, data) {
        this.positions = [];
        this.positionsCount = 0;
        this.currTick = 0;
        this.error = false;
        this.logic = [];
        this.balance = this.startingBalance = startingBalance;
        this.data = data;
    }
    Simulator.prototype.log = function (str) {
        console.log("[" + this.currTick + "]: " + str);
    };
    Simulator.prototype.elog = function (str, level) {
        console.log("[" + this.currTick + "]: ERROR: " + str + " //ERROR L" + level);
        this.error = true;
    };
    Simulator.build = function (startingBalance, type) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_1.methods.getData(type)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new Simulator(startingBalance, data)];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                if (this.data == undefined) {
                    this.elog("Data undefined", 0);
                    return [2 /*return*/];
                }
                for (i = 0; i < this.data.length; i++) {
                    this.currTick = i;
                    if (this.error)
                        return [2 /*return*/];
                    this.onTick(i);
                }
                this.onFinish();
                return [2 /*return*/];
            });
        });
    };
    return Simulator;
}());
exports["default"] = Simulator;
