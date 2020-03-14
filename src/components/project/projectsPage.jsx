import React, { Component } from "react";
import ProjectList from "./projectList";
import ProjectAdd from "./projectAdd";
import Global from "../../global.js";
class ProjectsPage extends Component {
  state = {
    projectTitle: "",
    projectBody: ""
  };
  render() {
    return (
      <div>
        <h1>ProjectsPage</h1>
        <div
          className="mx-auto"
          style={{ maxWidth: "800px", marginBottom: "150px" }}
        >
          <ProjectList onDelete={this.deleteProject.bind(this)} />
          <ProjectAdd
            onTitleChange={this.handleTitleUpdate.bind(this)}
            onBodyChange={this.handleBodyUpdate.bind(this)}
            onSubmit={this.createProject.bind(this)}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {}
  handleTitleUpdate(e) {
    this.setState({ projectTitle: e.target.value });
  }
  handleBodyUpdate(e) {
    this.setState({ projectBody: e.target.value });
  }
  createProject(e) {
    e.preventDefault();
    const url = Global.gatewayUrl("prjt/project/add");
    const body = {
      project_name: this.state.projectTitle,
      body: this.state.projectBody
    };
    console.log(body);
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, res => {
      console.log(res);
      window.location.reload(false);
    });
  }
  deleteProject(projectID) {
    const url = Global.gatewayUrl("prjt/project/delete");
    const body = {
      project_id: projectID
    };
    console.log(body);
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, res => {
      window.location.reload(false);
    });
  }
}

export default ProjectsPage;
