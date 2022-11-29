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
exports.methods = exports.Source = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
//import {default as _SPY_EOD} from '../data/spy_eod_93-16.11.2022.json'
//import {default as _NASDAQ_EOD} from '../data/nasdaq_eod_71-22.11.2022.json'
//import {default as _MSFT_EOD} from '../data/msft_eod_86-22.11.2022.json'
//import {default as _SPY_M1} from '../data/spy.usd_1min_bid_22.11.2021-19.11.2022.json'
//import {default as _SPY_M5} from '../data/SPY.USUSD_Candlestick_5_M_BID_25.11.2019-22.11.2022.json'
//import {default as _SPY_M15} from '../data/SPY.USUSD_Candlestick_15_M_BID_25.11.2019-22.11.2022.json'
var Source;
(function (Source) {
    /** SPY - US500S&P index
     *  USD
     *  End of day data
     *  (1993-2022)
     *  ~ 7k ticks */
    Source["SPY_EOD"] = "spy_eod_93-16.11.2022.json";
    /** NASDAQ - NASDAQ index
     *  USD
     *  End of day data
     *  (1971-2022)
     * */
    Source["NASDAQ_EOD"] = "nasdaq_eod_71-22.11.2022.json";
    /** MSFT - Microsoft
     *  USD
     *  End of day data
     *  (1986 - 2022)
     */
    Source["MSFT_EOD"] = "msft_eod_86-22.11.2022.json";
    /** SPY - US500S&P index
     *  USD
     *  1 minute candles
     *  (2021-2022)
     *  ~400k ticks
     */
    Source["SPY_M1"] = "spy.usd_1min_bid_22.11.2021-19.11.2022.json";
    /** SPY- US500S&P index
     *  USD
     *  5 minutes candles
     *  (2019-2022)
     *  ~300k ticks
    */
    Source[Source["SPY_M5"] = 5] = "SPY_M5";
    /** SPY - US500S&P index
     *  USD
     *  15 minutes candles
     *  (2019-2022)
     *  ~100k ticks
     */
    Source[Source["SPY_M15"] = 6] = "SPY_M15";
})(Source = exports.Source || (exports.Source = {}));
function request(type) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1["default"])('https://racuun.github.io/strategy-sim-database/data/' + type)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.methods = {
    getData: function (type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(type)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
};
var Data = {
    Source: Source
};
exports["default"] = Data;
