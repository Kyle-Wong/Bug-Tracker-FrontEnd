import React, { Component } from "react";
import ProjectList from "./projectList";
import Global from "../global.js";
class ProjectsPage extends Component {
  state = {
    projects: []
  };
  render() {
    return (
      <div>
        <h1>ProjectsPage</h1>
        <div className="mx-auto" style={{ width: "600px" }}>
          <ProjectList />
        </div>
      </div>
    );
  }
  componentDidMount() {}
}

export default ProjectsPage;
