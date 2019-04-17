"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var $404 = /** @class */ (function (_super) {
    __extends($404, _super);
    function $404(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    $404.prototype.render = function () {
        return ([
            React.createElement("section", { className: "header" },
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("header", null,
                        React.createElement("h1", null, "404: Not Found"),
                        React.createElement("p", null, "Sorry; this page does not exist"))))
        ]);
    };
    return $404;
}(React.Component));
exports.$404 = $404;
