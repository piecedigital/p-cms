import * as React from "react";
import { Project } from "./portfolio.class";

export default class Index extends React.Component {
    state: {
        portfolios: Project[]
    };

    constructor(props) {
        super(props);
        // console.log(props);

        this.state = {
            portfolios: props.portfolios || []
        };
    }

    render() {
        return ([
            <div className="page-wrap portfolio">
                <form action="/api/remove-project" method="POST">
                    <h2>List of Projects</h2>
                    <div className="projects">
                        {
                            this.state.portfolios.map((project: Project, ind) => {
                                return ([
                                    <input key={`${project.projectPK}-input`} id={`${project.projectPK}-input`} type="checkbox" name="projectPK" value={project.projectPK}/>,
                                    <div key={`${project.projectPK}`} className="project">
                                        <label htmlFor={`${project.projectPK}-input`}>
                                            <div className="image">
                                                <img src={project.imageURL} alt={`${project.description}`} />
                                            </div>
                                            <div className="info">
                                                <div className="project-name">
                                                    <span>{project.name}</span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                ]);
                            })
                        }
                    </div>
                    <button>Remove Selected</button>
                </form>
                <hr className="separator"></hr>
                <form className="add-project-form" action="/api/add-project" method="POST">
                    <h2>Add New Project</h2>
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