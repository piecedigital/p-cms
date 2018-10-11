import * as React from "react";
import { Route, Switch } from "react-router";

export function dangerouslySetHTML(html: string, className: string = "") {
    return class HTML extends React.Component {
        render() {
            return (
                <Switch>
                    <Route path="/" component={(props) =>
                        <div className={className} dangerouslySetInnerHTML={{
                            __html: html
                        }}></div>} />
                </Switch>
            );
        }
    }
}