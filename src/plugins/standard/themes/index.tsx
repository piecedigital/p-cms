import * as React from "react";
import { getThemes, loadedThemeData } from "../../../modules/helpers";

export default class Index extends React.Component {
    state: {
        themes: loadedThemeData[]
    };

    constructor(props) {
        super(props);

        var x = getThemes() || [];

        // console.log(x);

        this.state = {
            themes: x
        };
    }

    render() {
        return ([
            <div className="page-wrap portfolio">
                <form action="/api/apply-theme" method="POST">
                    <div className="themes">
                        {
                            this.state.themes.map((theme: loadedThemeData, ind) => {
                                return ([
                                    <input key={`${theme.directory}`} type="radio" name="theme" id={`${theme.directory}`} value={theme.directory} checked={process.env["THEME"] === theme.directory} readOnly />,
                                    <label key={`${theme.directory}`} htmlFor={`${theme.directory}`} className="theme">
                                        {
                                            (theme.tr.image) ? (
                                                <div className="image">
                                                    <img src={theme.tr.image} />
                                                </div>
                                            ) : null
                                        }
                                        <div className="info">
                                            <div className="project-name">
                                                <span>{theme.tr.name}</span>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="project-description">
                                                <span>{theme.tr.description}</span>
                                            </div>
                                        </div>
                                    </label>
                                ]);
                            })
                        }
                    </div><br/>
                    <div className="separator"></div><br/>
                    <button>Apply Theme</button>
                </form>
            </div>
        ]);
    }
}