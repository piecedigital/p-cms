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
            <span dangerouslySetInnerHTML={{
                __html: header({
                    title: "Admin Dashboard"
                } as renderOptions)
            }} />,
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
                        <Route path="/pc_admin/signup" render={(props) => <AdminSignup {...props} {...this.props} />} />
                        <Route path="/pc_admin/db-setup" render={(props) => <AdminDBSetup {...props} {...this.props} />} />
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
            <span dangerouslySetInnerHTML={{
                __html: footer(null)
            }} />
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
                            Login
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
                    <footer>
                        Need an account? <a href="/pc_admin/signup">Signup here</a>.
                    </footer>
                </div>
            </section>
        ]);
    }

}

export class AdminSignup extends React.Component {
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
                            Signup
                        </h1>
                    </header>
                    <form action="/pc_admin/signup" method="POST">
                        <input type="hidden" name="_csrf" value={this.props.csrfToken} />
                        <div>
                            <label htmlFor="">Your Name:</label><br />
                            <input type="text" name="displayName" />
                        </div>
                        <div>
                            <label htmlFor="">Username:</label><br />
                            <input type="text" name="username" />
                        </div>
                        <div>
                            <label htmlFor="">Password:</label><br />
                            <input type="password" name="password" />
                        </div>
                        <div>
                            <label htmlFor="">Confirm Password:</label><br />
                            <input type="password" name="passwordConfirm" />
                        </div>
                        <div>
                            <button type="submit">Signup</button>
                        </div>
                    </form>
                    <footer>
                        Need an account? <a href="/pc_admin/signup">Signup here</a>.
                    </footer>
                </div>
            </section>
        ]);
    }

}

export class AdminDBSetup extends React.Component {
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
                            Setup Database Connection
                        </h1>
                    </header>
                    <form action="/pc_admin/db-setup" method="POST">
                        <input type="hidden" name="_csrf" value={this.props.csrfToken} />
                        <div>
                            <label htmlFor="">Database Name:</label><br />
                            <input type="text" name="dbName" placeholder="piecedigital-cms" />
                        </div>
                        <div>
                            <label htmlFor="">Database Host:</label><br />
                            <input type="text" name="dbHost" placeholder="localhost" />
                        </div>

                        <div>
                            <label htmlFor="">Username:</label><br />
                            <input type="text" name="username" />
                        </div>
                        <div>
                            <label htmlFor="">Password:</label><br />
                            <input type="password" name="password" />
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        ]);
    }
}