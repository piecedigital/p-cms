import * as React from "react";
import { Route, Switch } from "react-router";

export class dangerousHTML {
    route: string;
    html: string;
    className: string;

    constructor(route: string, html: string, className: string = "") {
        this.route = route;
        this.html = html;
        this.className = className;
    }
}

export function dangerouslySetHTML(pages: dangerousHTML[]) {
    return class HTML extends React.Component {
        render() {
            return (
                <Switch>
                    {
                        pages.map((html, ind) =>
                            <Route key={ind} exact path={html.route} component={(props) =>
                                <div className={html.className} dangerouslySetInnerHTML={{
                                    __html: html.html
                                }}></div>} />
                        )
                    }
                </Switch>
            );
        }
    }
}