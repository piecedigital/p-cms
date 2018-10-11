import * as React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { Plugin } from "../modules/plugin.class";
import { $404 } from "./404";
import header from "./partials/header";
import { renderOptions } from "../modules/render";
import footer from "./partials/footer";

export class AdminDashboard extends React.Component {
    state: {
        adminViews?: Plugin[]
    };

    constructor(props) {
        super(props);
        // console.log("admin", props);

        this.state = {
            adminViews: props.adminViews || []
        }
    }

    render() {
        return ([
            header({
                title: "Admin Dashboard"
            } as renderOptions),
            <div className="admin-dashboard">
                <div className="nav">
                    <div className="item">
                        <Link to={`/`}>View Site</Link>
                    </div>
                    <div className="item">
                        <Link to={`/pc_admin/logout`}>Logout</Link>
                    </div>
                </div>
                <section className="side-panel">
                <Link to={`/pc_admin`} className="row logo">
                    <h4>My CMS</h4>
                </Link>
                {
                    this.state.adminViews.map((view: Plugin, ind) => {
                        return (
                            <Link key={`${view.directory}-${ind}`} to={`/pc_admin/plugin/${view.slug()}`} className="row">
                                <h4>{view.name}</h4>
                            </Link>
                        );
                    })
                }
                </section>
                <section className="main-content">
                    <Switch>
                        <Route path="/pc_admin/login" render={(props) => <AdminLogin {...props} {...this.props} />} />
                        {
                            this.state.adminViews.map(view => {
                                return (
                                    <Route key={view.name} path={`/pc_admin/plugin/${view.directory}`} render={(props) => <view.component {...props} {...this.props} />} />
                                );
                            })
                        }
                        <Route path="/pc_admin" render={(props) => <AdminDashboardWelcome {...props} {...this.props} />} />
                        <Route path="*" render={(props) => <$404 {...props} {...this.props} />} />
                    </Switch>
                </section>
            </div>,
            footer(null)
        ]);
    }
}

export class AdminDashboardWelcome extends React.Component {
    state: {};

    constructor(props) {
        super(props);
    }

    render() {
        return ([
            <section className="header">
                <div className="page-wrap">
                    <header>
                        <h1>
                            Welcome!
                        </h1>
                    </header>
                </div>
            </section>
        ]);
    }
}

export class AdminLogin extends React.Component {
    state: {};
    props: {
        csrfToken?: string
    } | any;

    constructor(props) {
        super(props);
    }

    render() {
        return ([
            <section className="header">
                <div className="page-wrap">
                    <header>
                        <h1>
                            Administration
                        </h1>
                    </header>
                    <form action="/pc_admin/login" method="POST">
                        <input type="hidden" name="_csrf" value={this.props.csrfToken}/>
                        <div>
                            <label htmlFor="">Username:</label><br/>
                            <input type="text" name="username"/>
                        </div>
                        <div>
                            <label htmlFor="">Password:</label><br/>
                            <input type="password" name="password"/>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </section>
        ]);
    }

}