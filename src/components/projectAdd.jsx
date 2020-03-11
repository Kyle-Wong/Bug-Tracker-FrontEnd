import React, { Component } from "react";
import Global from "../global";
import "../css/projectList.css";
class ProjectAdd extends Component {
  render() {
    const { onTitleChange, onBodyChange, onSubmit } = this.props;
    return (
      <div className="project">
        <div>
          <h3 htmlFor="exampleFormControlTextarea1">Create New Project</h3>
        </div>
        <div>
          <label htmlFor="exampleFormControlSelect1">Project Title</label>
          <div>
            <input className="form" onChange={onTitleChange}></input>
          </div>
        </div>
        <label htmlFor="exampleFormControlSelect1">Project Description</label>

        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={onBodyChange}
        ></textarea>
        <button
          className="d-flex ml-auto btn-outline-primary"
          onClick={onSubmit}
        >
          Create Project
        </button>
      </div>
    );
  }
}

export default ProjectAdd;
