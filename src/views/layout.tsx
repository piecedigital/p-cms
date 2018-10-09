import * as React from "react";
import { Switch, Route } from "react-router";
// import views
import { Home } from "../views/home";
import { $404 } from "../views/404";
import { InternalError } from "../views/internal-error";
import { AdminDashboard, AdminLogin } from "../views/admin";

const views: Record<string, any> = {
    "index": Home,
    "home": Home,
    "admin": AdminDashboard,
    "adminLogin": AdminLogin,
    "404": $404,
    "internalError": InternalError,
}

export class Layout extends React.Component {
    state: {};
    props: any;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return ([
            <nav>
                <div className="page-wrap">
                </div>
            </nav>,
            (this.props.children) ? (
                React.Children.map(
                    this.props.children,
                    child => React.cloneElement(child as React.ReactElement<any>, this.props)
                )
            ) : (
                <Switch>
                    <Route path="/admin*" render={(props) => <AdminDashboard {...props} {...this.props} />} />
                    <Route path="/" render={(props) => <Home {...props} {...this.props} />} />
                    <Route component={$404} />
                </Switch>
            ),
            <section className="footer">
                <div className="section-separator">
                    <div className="triangle"></div>
                </div>
                <div className="page-wrap">
                    <footer>
                        &copy; Copyright  Darryl Dixon, 2018. All Rights Reserved.
                    </footer>
                </div>
            </section>
        ]);
    }
}