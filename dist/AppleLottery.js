"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var cx = require("classnames");
var utils_1 = require("./utils");
var lodash_1 = require("lodash");
var button_1 = require("./button");
// 苹果机抽奖组件
var AppleLottery = /** @class */ (function (_super) {
    __extends(AppleLottery, _super);
    function AppleLottery(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentIndex: 0
        };
        _this.speed = _this.props.initialSpeed;
        _this.type = 'wait';
        _this.raf = null;
        _this.lastTime = null;
        _this.awardIndex = null;
        _this.handleStart = function () {
            if (_this.type !== 'wait') {
                return;
            }
            var _a = _this.props, initialSpeed = _a.initialSpeed, validate = _a.validate, onLotteryStart = _a.onLotteryStart;
            validate(function (verify) {
                if (verify) {
                    _this.speed = initialSpeed;
                    _this.type = 'infinity';
                    onLotteryStart(_this.handleStop, _this.type);
                    requestAnimationFrame(_this.handleChange);
                }
            });
        };
        _this.handleStop = function (index) {
            _this.type = 'slow';
            _this.awardIndex = index;
            var second = (_this.props.rowCount + Math.random() - 0.5) * 1000;
            setTimeout(function () { return _this.type = 'stop'; }, second);
        };
        _this.handleComplete = function (index) {
            var _a = _this.props, onLotteryComplete = _a.onLotteryComplete, list = _a.list;
            onLotteryComplete(index, list[index]);
        };
        _this.handleChange = function () {
            var _a = _this.props, list = _a.list, slowAcceleration = _a.slowAcceleration, stopAcceleration = _a.stopAcceleration;
            var currentIndex = _this.state.currentIndex;
            var len = list.length;
            if (!_this.lastTime || Date.now() - _this.lastTime >= _this.speed) {
                if (_this.type === 'stop' && _this.awardIndex === currentIndex) {
                    _this.handleComplete(_this.awardIndex);
                    _this.type = 'wait';
                    return;
                }
                var typeToAdd = {
                    infinity: 0,
                    slow: slowAcceleration,
                    stop: stopAcceleration
                };
                _this.speed += typeToAdd[_this.type] || 0;
                _this.lastTime = Date.now();
                var index = currentIndex === len - 1 ? 0 : currentIndex + 1;
                _this.setState({
                    currentIndex: index
                });
            }
            requestAnimationFrame(_this.handleChange);
        };
        _this.renderItem = function (item, index) {
            var _a = _this.props, rowCount = _a.rowCount, itemStyle = _a.itemStyle, itemImageStyle = _a.itemImageStyle, itemNameStyle = _a.itemNameStyle, itemRenderer = _a.itemRenderer, prefixClass = _a.prefixClass;
            var cls = cx(prefixClass + "-apple-item", (_b = {},
                _b[prefixClass + "-apple-item-active"] = index === _this.state.currentIndex && _this.type !== 'wait',
                _b));
            var coordinate = utils_1.default(rowCount)[index];
            var margin = _this.margin;
            var unit = _this.unit;
            var style = lodash_1.assign({}, {
                width: unit + "%",
                height: unit + "%",
                left: coordinate.x * (unit + margin) + "%",
                top: coordinate.y * (unit + margin) + "%"
            }, lodash_1.isFunction(itemStyle) ? itemStyle(item, index, index === _this.state.currentIndex) : itemStyle);
            var innerStyle = lodash_1.assign({}, item.img ? {
                backgroundImage: "url(" + item.img + ")"
            } : {}, lodash_1.isFunction(itemImageStyle) ? itemImageStyle(item, index, index === _this.state.currentIndex) : itemImageStyle);
            var computedNameStyle = lodash_1.isFunction(itemNameStyle) ? itemNameStyle(item, index, index === _this.state.currentIndex) : itemNameStyle;
            if (itemRenderer) {
                return itemRenderer(item, computedNameStyle);
            }
            return (React.createElement("div", { className: cls, style: style, key: item.name + "-" + index },
                React.createElement("div", { className: prefixClass + "-apple-item-image", style: innerStyle }),
                React.createElement("p", { style: computedNameStyle }, item.name)));
            var _b;
        };
        var rowCount = props.rowCount;
        _this.margin = Math.floor(10 / rowCount);
        _this.unit = Number(((100 - (rowCount - 1) * _this.margin) / rowCount).toFixed(1));
        return _this;
    }
    AppleLottery.prototype.render = function () {
        var _a = this.props, list = _a.list, rowCount = _a.rowCount, style = _a.style, btnStyle = _a.btnStyle, btnIamge = _a.btnIamge, prefixClass = _a.prefixClass, buttonRenderer = _a.buttonRenderer;
        var assignedBtnStyle = lodash_1.assign({}, lodash_1.isFunction(btnStyle) ? btnStyle() : btnStyle, {
            width: this.unit + "%",
            height: this.unit + "%"
        });
        var computedStyle = lodash_1.isFunction(style) ? style() : style;
        return (React.createElement("div", { className: prefixClass + "-apple", style: computedStyle },
            React.createElement("div", { className: prefixClass + "-apple-slotbtn", style: assignedBtnStyle, onClick: this.handleStart }, buttonRenderer ? buttonRenderer() : React.createElement("img", { src: btnIamge, alt: 'lottery-button' })),
            rowCount > 0 && list.map(this.renderItem)));
    };
    AppleLottery.defaultProps = {
        list: [],
        rowCount: 3,
        initialSpeed: 100,
        slowAcceleration: 20,
        stopAcceleration: 40,
        validate: function (next) { return next(true); },
        onLotteryComplete: function () { window.console.log('complete'); },
        onLotteryStart: function () { window.console.log('start'); },
        btnIamge: button_1.default,
        prefixClass: 'react-lottery',
        style: {},
        btnStyle: {},
        itemStyle: {},
        itemNameStyle: {}
    };
    return AppleLottery;
}(react_1.Component));
exports.default = AppleLottery;
