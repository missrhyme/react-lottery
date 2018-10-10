"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCoordinate = function (n) {
    var length = 4 * (n - 1);
    var arr = [];
    for (var index = 0; index < length; index++) {
        if (index < n) {
            arr.push({
                x: index,
                y: 0
            });
        }
        else if (index >= n && index < 2 * n - 1) {
            arr.push({
                x: n - 1,
                y: index - n + 1
            });
        }
        else if (index >= 2 * n - 1 && index < 3 * n - 2) {
            arr.push({
                x: 3 * n - 3 - index,
                y: n - 1
            });
        }
        else {
            arr.push({
                x: 0,
                y: length - index
            });
        }
    }
    return arr;
};
exports.default = getCoordinate;
