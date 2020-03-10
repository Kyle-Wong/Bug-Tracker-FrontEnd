import React, { Component } from "react";
import Global from "../global";
import ProjectListItem from "./projectListItem";
class ProjectList extends Component {
  state = {
    projects: []
  };
  render() {
    return (
      <div>
        <h1 className="text-center">My Projects</h1>
        {this.renderProjects()}
      </div>
    );
  }
  componentDidMount() {
    this.getProjects();
  }
  getProjects() {
    const url = Global.gatewayUrl("prjt/project/getAll");
    const options = Global.options({}, null, "GET");
    console.log(options);
    Global.fetch(url, options, res => {
      this.setProjectList(res);
    });
  }
  setProjectList(res) {
    console.log(res);
    this.setState({ projects: res.projects });
  }
  renderProjects() {
    const { projects } = this.state;
    return (
      <ul>
        {projects.map(e => {
          return <ProjectListItem project={e} key={e.project_id} />;
        })}
      </ul>
    );
  }
}

export default ProjectList;
