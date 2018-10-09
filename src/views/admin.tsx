import * as React from "react";
import { Project } from "../modules/project.class";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { Plugin } from "../modules/plugin.class";

export class AdminDashboard extends React.Component {
    state: {
        adminViews?: Plugin[]
    };

    constructor(props) {
        super(props);
        this.state = {
            adminViews: props.adminViews || []
        }
    }

    render() {
        return ([
            <div className="admin-dashboard">
                <div className="nav">
                    <div className="item">
                        <Link to={`/`}>View Site</Link>
                    </div>
                    {/* <div className="item">
                        <Link to={`/`}>View Site</Link>
                    </div> */}
                </div>
                <section className="side-panel">
                <Link to={`/admin`} className="row logo">
                    <h4>My CMS</h4>
                </Link>
                {
                    this.state.adminViews.map((view: Plugin, ind) => {
                        return (
                            <Link key={`${view.name}-${ind}`} to={`/admin/${view.slug()}`} className="row">
                                <h4>{view.name}</h4>
                            </Link>
                        );
                    })
                }
                </section>
                <section className="main-content">
                    <Switch>
                        {
                            this.state.adminViews.map(view => {
                                return (
                                    <Route key={view.name} path={`/admin/${view.name}`} render={(props) => <view.component {...props} {...this.props} />} />
                                );
                            })
                        }
                        <Route path="/admin-login" render={(props) => <AdminLogin {...props} {...this.props} />} />
                        <Route path="/admin" render={(props) => <AdminDashboardWelcome {...props} {...this.props} />} />
                    </Switch>
                </section>
            </div>
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
                    <form action="/admin-login" method="POST">
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