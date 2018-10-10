import * as React from "react";
import { Switch, Route } from "react-router";
// import views
import { $404 } from "../views/404";
import { InternalError } from "../views/internal-error";
import { AdminDashboard, AdminLogin } from "../views/admin";

const views: Record<string, any> = {
    "admin": AdminDashboard,
    "adminLogin": AdminLogin,
    "404": $404,
    "internalError": InternalError,
}


export class Layout extends React.Component {
    state: {
        theme: any
    };
    props: any;

    constructor(props) {
        super(props);
        // console.log("yerrrr", props.match, props.location);

        this.state = {
            theme: require(`../themes/${process.env["THEME"]}/index`).default
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
                    <Route path="/admin" component={(props) => {
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