import React, { Component, useState } from "react";
import Global from "../../global";
import ProjectListItem from "./projectListItem";
class ProjectList extends Component {
  state = {
    projects: [],
    accessLevels: {}
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
      this.getAccessLevels(res.projects);
    });
  }
  setProjectList(res) {
    console.log(res);
    this.setState({ projects: res.projects });
  }

  renderProjects() {
    const { projects, accessLevels } = this.state;
    const { onDelete } = this.props;
    if (projects.length !== 0) {
      return (
        <div>
          {projects.map(e => {
            const accessLevel =
              typeof accessLevels[e.project_id] === "undefined"
                ? 3
                : accessLevels[e.project_id];
            return (
              <ProjectListItem
                project={e}
                key={e.project_id}
                onDelete={onDelete}
                accessLevel={accessLevel}
              />
            );
          })}
        </div>
      );
    } else {
      return <h1 className="text-center my-5">No Projects Yet</h1>;
    }
  }
  getAccessLevels(projects) {
    const url = Global.gatewayUrl("prjt/project/accessLevels");
    let project_list = new Array(projects.length);
    for (let i = 0; i < projects.length; i++) {
      project_list[i] = projects[i].project_id;
    }
    const body = {
      project_list
    };
    const options = Global.options({}, body, "POST");
    console.log(options);
    let accessLevels = {};
    Global.fetch(url, options, data => {
      console.log(data);
      data.access_level.map(e => {
        accessLevels[e.project_id] = e.access_level;
      });
      this.setState({ accessLevels });
    });
  }
}

export default ProjectList;
