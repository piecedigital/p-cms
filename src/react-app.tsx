import * as React from "react";
import * as ReactDom from "react-dom";
import { MemoryRouter as Router } from "react-router";
// import { createMemoryHistory as createHistory, History } from "history";
import { Layout } from "./views/layout";

// const history: History = createHistory();

ReactDom.render(
    <Router>
        <Layout/>
    </Router>, document.querySelector(".react-app"));