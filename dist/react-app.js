"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var react_router_1 = require("react-router");
// import { createMemoryHistory as createHistory, History } from "history";
var layout_1 = require("./views/layout");
// const history: History = createHistory();
ReactDom.render(React.createElement(react_router_1.MemoryRouter, null,
    React.createElement(layout_1.Layout, null)), document.querySelector(".react-app"));
