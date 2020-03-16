import React, { Component } from "react";
import ProjectList from "./projectList";
import ProjectAdd from "./projectAdd";
import ConfirmDeleteModal from "./confirmDeleteModal";

import Global from "../../global.js";
class ProjectsPage extends Component {
  state = {
    projectTitle: "",
    projectBody: "",
    modalVisible: false,
    modalID: -1
  };
  render() {
    return (
      <div>
        <ConfirmDeleteModal
          modalID={this.state.modalID}
          show={this.state.modalVisible}
          onClose={this.handleModalClose.bind(this)}
          onDelete={this.deleteProject.bind(this)}
        />

        <div className="w3-blue w3-center" style={{ padding: "50px 16px" }}>
          {" "}
          <h1 className="text-center">My Projects</h1>
        </div>
        <div
          className="mx-auto"
          style={{ maxWidth: "800px", marginBottom: "150px" }}
        >
          <ProjectList onDelete={this.handleModalOpen.bind(this)} />
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
  handleModalClose() {
    this.setState({ modalVisible: false });
  }
  handleModalOpen(project_id) {
    this.setState({ modalVisible: true, modalID: project_id });
  }
  createProject(e) {
    e.preventDefault();
    if (this.state.projectTitle.length <= 0) return;
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
  deleteProject(props) {
    console.log(props);
    const url = Global.gatewayUrl("prjt/project/delete");
    const body = {
      project_id: props.modalID
    };
    console.log(body);
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, res => {
      window.location.reload(false);
    });
  }
}

export default ProjectsPage;
