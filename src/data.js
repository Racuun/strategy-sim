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
var spy_eod_93_16_11_2022_json_1 = __importDefault(require("../data/spy_eod_93-16.11.2022.json"));
var nasdaq_eod_71_22_11_2022_json_1 = __importDefault(require("../data/nasdaq_eod_71-22.11.2022.json"));
var msft_eod_86_22_11_2022_json_1 = __importDefault(require("../data/msft_eod_86-22.11.2022.json"));
var spy_usd_1min_bid_22_11_2021_19_11_2022_json_1 = __importDefault(require("../data/spy.usd_1min_bid_22.11.2021-19.11.2022.json"));
var Source;
(function (Source) {
    /** SPY - US500S&P index;
     *  USD;
     *  End of day data
     *  (1993-2022)
     *  ~ 7k ticks */
    Source[Source["SPY_EOD_1993_2022"] = 1] = "SPY_EOD_1993_2022";
    /** NASDAQ - NASDAQ index;
     *  USD;
     *  End of day data
     *  (1971-2022)
     * */
    Source[Source["NASDAQ_EOD_1971_2022"] = 2] = "NASDAQ_EOD_1971_2022";
    /** MSFT - Microsoft;
     *  USD;
     *  End of day data
     *  (1986 - 2022)
     */
    Source[Source["MSFT_EOD_1986_2022"] = 3] = "MSFT_EOD_1986_2022";
    /** SPY - US500S&P index;
     *  USD;
     *  1 minute candles
     *  (2021-2022)
     *  ~400k ticks
     */
    Source[Source["SPY_M1_2021_2022"] = 4] = "SPY_M1_2021_2022";
    /** @not_implemented */
    Source[Source["SPY_M5_2021_2022"] = 5] = "SPY_M5_2021_2022";
    /** @not_implemented */
    Source[Source["SPY_M15_2021_2022"] = 6] = "SPY_M15_2021_2022";
})(Source = exports.Source || (exports.Source = {}));
var methods = {
    getData: function (type) {
        switch (type) {
            case Source.SPY_EOD_1993_2022:
                return spy_eod_93_16_11_2022_json_1["default"];
            case Source.NASDAQ_EOD_1971_2022:
                return nasdaq_eod_71_22_11_2022_json_1["default"];
            case Source.MSFT_EOD_1986_2022:
                return msft_eod_86_22_11_2022_json_1["default"];
            case Source.SPY_M1_2021_2022:
                return spy_usd_1min_bid_22_11_2021_19_11_2022_json_1["default"];
        }
    }
};
var Data = __assign(__assign({}, methods), { Source: Source });
exports["default"] = Data;
