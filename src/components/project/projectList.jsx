import React, { Component, useState } from "react";
import Global from "../../global";
import ProjectListItem from "./projectListItem";
class ProjectList extends Component {
  state = {
    projects: []
  };
  render() {
    return (
      <div>
        <div className="mx-auto">{this.renderProjects()}</div>
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
    const { onDelete } = this.props;
    if (projects.length !== 0) {
      return (
        <div>
          {projects.map(e => {
            return (
              <ProjectListItem
                project={e}
                key={e.project_id}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      );
    } else {
      return <h1 className="text-center my-5">No Projects Yet</h1>;
    }
  }
}

export default ProjectList;
