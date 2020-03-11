import React, { Component } from "react";
import ConfirmDeleteWindow from "./confirmDeleteWindow";

import "../css/projectList.css";

class ProjectListItem extends Component {
  state = {};
  render() {
    const { project_id, project_name, bug_count } = this.props.project;
    const { onDelete } = this.props;
    return (
      <React.Fragment>
        <ConfirmDeleteWindow id={`modal${project_id}`} />

        <div className="d-flex project mx-auto my-3" style={{ width: "600" }}>
          <div className="align-self-center p-2 mr-auto">
            <h5>
              <a href={"/projects/" + project_id} style={{ color: "black" }}>
                {" "}
                {project_name}{" "}
              </a>
            </h5>
          </div>
          <div className=" align-self-center ml-auto p-2">
            <h5>Active Bugs: {bug_count}</h5>
          </div>
          <div className="align-self-center p-2">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-toggle="modal"
              data-target="#myModal"
            >
              Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectListItem;
