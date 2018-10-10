import * as React from "react";
import { getThemes } from "../../../modules/helpers";

export default class Index extends React.Component {
    state: {};

    constructor(props) {
        super(props);
        console.log(getThemes());

        this.state = {
            portfolios: props.portfolios || []
        };
    }

    render() {
        return ([
            <div className="page-wrap portfolio">
                <form action="/api/remove-project" method="POST">
                    <div className="projects">
                        {
                            [].map((project, ind) => {
                                return (
                                    <div key={`${project._id}`} className="project">
                                        <a href={`${project.projectURL}`}>
                                            <div className="image">
                                                <img src={project.imageURL} alt={`${project.description}`} />
                                            </div>
                                            <div className="info">
                                                <div className="project-name">
                                                    <span>{project.name}</span>
                                                </div>
                                            </div>
                                        </a>
                                        <input type="checkbox" name="_id" id="" value={project._id.toHexString()}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <button>Remove Selected</button>
                </form>
                <form className="add-project-form" action="/api/add-project" method="POST">
                    <div>
                        <label htmlFor="">Project Name</label><br/>
                        <input type="text" name="name"/>
                    </div>
                    <div>
                        <label htmlFor="">Project Description</label><br/>
                        <textarea name="description" id="" cols={30} rows={10}></textarea>
                    </div>
                    <div>
                        <label htmlFor="">Project URL</label><br/>
                        <input type="text" name="project-url" />
                    </div>
                    <div>
                        <label htmlFor="">Project Image</label><br/>
                        <input type="text" name="image-url" defaultValue="/public/media/images/cat-dog.jpg" disabled/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        ]);
    }
}