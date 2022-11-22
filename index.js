"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var position_1 = __importDefault(require("./src/position"));
var data_1 = __importDefault(require("./src/data"));
var simulator_1 = __importDefault(require("./src/simulator"));
var StrategySim = __assign(__assign({}, data_1["default"]), { position: position_1["default"], Simulator: simulator_1["default"] });
exports["default"] = StrategySim;
