import * as React from "react";

export class InternalError extends React.Component {
    state: {};
    props: any;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return ([
            <section className="header">
                <div className="page-wrap">
                    <header>
                        <h1>
                            {this.props.code}: Internal Error
                        </h1>
                        <p>{this.props.message}</p>
                    </header>
                </div>
            </section>
        ]);
    }
}