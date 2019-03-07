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
var InternalError = /** @class */ (function (_super) {
    __extends(InternalError, _super);
    function InternalError(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    InternalError.prototype.render = function () {
        return ([
            React.createElement("section", { className: "header" },
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("header", null,
                        React.createElement("h1", null,
                            this.props.code,
                            ": Internal Error"),
                        React.createElement("p", null, this.props.message))))
        ]);
    };
    return InternalError;
}(React.Component));
exports.InternalError = InternalError;
