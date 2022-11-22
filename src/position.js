"use strict";
exports.__esModule = true;
var position = /** @class */ (function () {
    function position(_index, price) {
        this.closePrice = undefined;
        this.percentage = undefined;
        this.isClosed = false;
        this.index = _index;
        this.openPrice = price;
    }
    position.prototype.close = function (price) {
        this.closePrice = price;
        this.percentage = (this.closePrice / this.openPrice * 100);
        this.isClosed = true;
    };
    return position;
}());
exports["default"] = position;
