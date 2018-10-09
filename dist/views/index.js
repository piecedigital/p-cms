"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Index.prototype.render = function () {
        var _this = this;
        return ([
            React.createElement("nav", null,
                React.createElement("div", { className: "page-wrap" })),
            React.Children.map(this.props.children, function (child) { return React.cloneElement(child, _this.props); }),
            React.createElement("section", { className: "footer" },
                React.createElement("div", { className: "section-separator" },
                    React.createElement("div", { className: "triangle" })),
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("footer", null, "\u00A9 Copyright  Darryl Dixon, 2018. All Rights Reserved.")))
        ]);
    };
    return Index;
}(React.Component));
exports.Index = Index;
