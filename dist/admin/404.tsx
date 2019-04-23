import * as React from "react";

export class $404 extends React.Component<any, any> {
    state: {};

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
                            404: Not Found
                        </h1>
                        <p>
                            Sorry; this page does not exist
                        </p>
                    </header>
                </div>
            </section>
        ]);
    }
}