import React, { Component } from "react";
import Global from "../../global";
import ModalButton from "../modalButton";
import "../../css/bugListItem.css";

const BugListItem = (props) => {
  const { bug, showModal, onDelete, onResolve, accessLevel } = props;
  const bodyID = `body${bug.bug_id}`;
  const tags = () => {
    const { tag_names } = props.bug;
    if (tag_names.length > 0) {
      return (
        <span>
          {tag_names.map((e) => {
            return (
              <span className="tag badge badge-pill badge-primary" key={e}>
                {e}
              </span>
            );
          })}
        </span>
      );
    } else {
      return <span className="tag badge badge-pill badge-primary">None</span>;
    }
  };
  const workers = () => {
    const { workers } = props.bug;
    if (workers.length > 0) {
      return <span>{workers.join(", ")} </span>;
    } else {
      return <span>None</span>;
    }
  };
  const resolved = () => {
    return props.resolved === 1 ? "Resolved" : "Unresolved";
  };
  const priorityLevel = (i) => {
    switch (i) {
      case 0:
        return "Highest";
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      case 4:
        return "Lowest";
      default:
        return "Lowest";
    }
  };
  return (
    <React.Fragment>
      <div className="card bug" style={{ marginBottom: "10px" }}>
        <div
          className="card-header d-flex"
          data-toggle="collapse"
          data-target={"#" + bodyID}
        >
          <div className="col-sm-4">{bug.title}</div>
          <div className="ml-auto col-sm-2">{bug.created_by}</div>
          <div className=" col-sm-3">
            {Global.convertToDate(bug.create_time)}
          </div>
          <div className="col-sm-2">{priorityLevel(bug.priority)}</div>
          <div className="col-sm-1">{bug.resolved === 1 ? "Yes" : "No"}</div>
        </div>
        <div className=" collapse" id={bodyID}>
          <div className="row bug-body-header">
            <div className="col tags">
              <div>Tags:&nbsp;{tags()}</div>
            </div>
          </div>
          <hr />
          <div className="card-body" style={{ paddingTop: "0px" }}>
            {bug.body}
          </div>
          {accessLevel <= 1 && (
            <div className="card-footer row mx-0">
              <div className="ml-auto">
                <button
                  onClick={() => {
                    showModal(bug);
                  }}
                  className="btn btn-outline-primary"
                >
                  Edit
                </button>
              </div>
              <div
                className="btn btn-outline-secondary mx-2"
                onClick={() => {
                  onResolve(bug.bug_id, bug.resolved === 1 ? 0 : 1);
                }}
              >
                Mark As {bug.resolved === 1 ? "Unresolved" : "resolved"}
              </div>
              {
                <div
                  className="btn btn-outline-danger"
                  onClick={() => {
                    onDelete(bug.bug_id);
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  &nbsp;Delete
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BugListItem;
/*
class BugListItem extends Component {
  state = {};
  render() {
    const { bug, showModal, onDelete, onResolve, accessLevel } = this.props;
    const bodyID = `body${bug.bug_id}`;
    return (
      <React.Fragment>
        <div
          className="card bug"
          style={{ marginBottom: "10px" }}
        >
          <div
            className="card-header d-flex"
            data-toggle="collapse"
            data-target={"#" + bodyID}
          >
            <div className="col-sm-4">{bug.title}</div>
            <div className="ml-auto col-sm-2">{bug.created_by}</div>
            <div className=" col-sm-3">
              {Global.convertToDate(bug.create_time)}
            </div>
            <div className="col-sm-2">{this.priorityLevel(bug.priority)}</div>
            <div className="col-sm-1">{bug.resolved === 1 ? "Yes" : "No"}</div>
          </div>
          <div className=" collapse" id={bodyID}>
            <div className="row bug-body-header">
              <div className="col tags">
                <div>Tags:&nbsp;{this.tags()}</div>
              </div>
            </div>
            <hr />
            <div className="card-body" style={{ paddingTop: "0px" }}>
              {bug.body}
            </div>
            {accessLevel <= 1 && (
              <div className="card-footer row mx-0">
                <div className="ml-auto">
                  <button
                    onClick={() => {
                      showModal(bug);
                    }}
                    className="btn btn-outline-primary"
                  >
                    Edit
                  </button>
                </div>
                <div
                  className="btn btn-outline-secondary mx-2"
                  onClick={() => {
                    onResolve(bug.bug_id, bug.resolved === 1 ? 0 : 1);
                  }}
                >
                  Mark As {bug.resolved === 1 ? "Unresolved" : "resolved"}
                </div>
                {
                  <div
                    className="btn btn-outline-danger"
                    onClick={() => {
                      onDelete(bug.bug_id);
                    }}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    &nbsp;Delete
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
  tags() {
    const { tag_names } = this.props.bug;
    if (tag_names.length > 0) {
      return (
        <span>
          {tag_names.map((e) => {
            return (
              <span className="tag badge badge-pill badge-primary" key={e}>
                {e}
              </span>
            );
          })}
        </span>
      );
    } else {
      return <span className="tag badge badge-pill badge-primary">None</span>;
    }
  }
  workers() {
    const { workers } = this.props.bug;
    if (workers.length > 0) {
      return <span>{workers.join(", ")} </span>;
    } else {
      return <span>None</span>;
    }
  }
  resolved() {
    return this.props.resolved === 1 ? "Resolved" : "Unresolved";
  }
  priorityLevel(i) {
    switch (i) {
      case 0:
        return "Highest";
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      case 4:
        return "Lowest";
      default:
        return "Lowest";
    }
  }
}

export default BugListItem;
*/
