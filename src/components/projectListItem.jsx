import React, { Component } from "react";
import "../css/projectList.css";

class ProjectListItem extends Component {
  state = {};
  render() {
    const { project_id, project_name, active_bugs } = this.props.project;
    return (
      <React.Fragment>
        <div className="d-flex mb-4 project">
          <div className=" mr-auto p-2">
            <h5>
              <a href={"/projects/" + project_id}> {project_name} </a>
            </h5>
          </div>
          <div className="ml-auto p-2">
            <h5>Active Bugs: {active_bugs}</h5>
          </div>
          <button type="button" className="p-2 btn btn-outline-danger">
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectListItem;
