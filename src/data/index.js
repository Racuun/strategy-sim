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
exports.Source = void 0;
var spy_eod_93_22_json_1 = __importDefault(require("./json/spy_eod_93-22.json"));
var Source;
(function (Source) {
    Source["SPY_EOD_1993_2022"] = "spy_eod_93-22.json";
})(Source = exports.Source || (exports.Source = {}));
var methods = {
    getData: function (type) {
        switch (type) {
            case Source.SPY_EOD_1993_2022:
                return spy_eod_93_22_json_1["default"];
        }
    }
};
var Data = __assign(__assign({}, methods), { Source: Source });
exports["default"] = Data;
