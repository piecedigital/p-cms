import * as React from "react";
import { Switch, Route } from "react-router";
// import views
import { $404 } from "../views/404";
import { InternalError } from "../views/internal-error";
import { AdminDashboard, AdminLogin } from "../views/admin";
import { renderOptions } from "../modules/render";
import { readFileSync } from "fs";
import { join } from "path";
import { PageResults } from "../modules/helpers";

const views: Record<string, any> = {
    "admin": AdminDashboard,
    "adminLogin": AdminLogin,
    "404": $404,
    "internalError": InternalError,
}

export class ReactHandler extends React.Component {
    state: {
        theme: any
    };
    props: any;

    constructor(props) {
        super(props);
        // console.log("yerrrr", props.match, props.location);

        let theme = null;

        try {
            theme = require(`../themes/${process.env["THEME"]}/index`).default()
        } catch (error) {
            // console.error(error);
            try {
                theme = require(`../themes/example/index`).default()
            } catch (error) {
                // console.error(error);
            }
        }

        if(!theme) console.error("There was a problem loading a theme. Even the backup failed...");

        this.state = {
            theme
        };
    }

    render() {
        return ([
            (this.props.children) ? (
                React.Children.map(
                    this.props.children,
                    child => React.cloneElement(child as React.ReactElement<any>, this.props)
                )
            ) : (
                <Switch>
                    <Route path="/pc_admin" component={(props) => {
                        return <AdminDashboard {...props} {...this.props} />;
                    }} />
                    <Route path="/" component={(props) => {
                        return <this.state.theme {...props} {...this.props} />;
                    }} />
                    {/* <Route component={$404} /> */}
                </Switch>
            )
        ]);
    }
}

export const HandlebarsHandler = function (url: string, options: renderOptions) {
    let theme: (url: string) => PageResults = null;

    try {
        theme = require(`../themes/${process.env["THEME"]}/index`).default
    } catch (error) {
        // console.error(error);
        theme = (url: string) => {
            return {
                params: {},
                page: "500: Theme configuration defunct",
                queryList: []
            } as PageResults
        }
    }

    return theme(url);
}