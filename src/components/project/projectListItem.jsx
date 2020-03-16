import React, { Component } from "react";
import ConfirmDeleteWindow from "./confirmDeleteModal";

import "../../css/projectList.css";

class ProjectListItem extends Component {
  state = {};
  render() {
    const {
      project_id,
      project_name,
      bug_count,
      root_user,
      body
    } = this.props.project;
    const { onDelete } = this.props;
    return (
      <React.Fragment>
        <ConfirmDeleteWindow id={`modal${project_id}`} />
        <div className="project-list-item card my-5 border border-dark">
          <div className="card-header">
            <div className="container-fluid row ">
              <div className="col-sm-4">
                <a
                  className="project-header"
                  href={
                    "/projects/" +
                    project_id +
                    "?search=&page=0&order=title&direction=asc&includeResolved=false"
                  }
                >
                  {project_name}
                </a>
                &nbsp;
                <span className="badge badge-primary">{bug_count}</span>
              </div>
              <div className="col-sm-3 align-self-center ml-auto">
                Created by: {root_user}
              </div>
              <div className="col-sm-1 align-self-center">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    onDelete(project_id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">{body}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectListItem;
