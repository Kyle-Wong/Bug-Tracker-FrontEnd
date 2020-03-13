import React, { Component } from "react";
import Global from "../global";
import "../css/bugListItem.css";
class BugListItem extends Component {
  state = {};
  render() {
    const { bug } = this.props;
    const bodyID = `body${bug.bug_id}`;
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
            <div className="col-sm-1">{bug.priority}</div>
            <div className="col-sm-1">{bug.resolved === 1 ? "yes" : "no"}</div>
          </div>
          <div className=" collapse" id={bodyID}>
            <div className="row bug-body-header">
              <div className="col tags">
                <div>Tags:&nbsp;{this.tags()}</div>
              </div>
              <div className="col workers">
                <div>Assigned Workers:&nbsp;{this.workers()}</div>
              </div>
            </div>
            <hr />
            <div className="card-body" style={{ paddingTop: "0px" }}>
              {bug.body}
            </div>
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
          {tag_names.map(e => {
            return (
              <span className="tag badge badge-pill badge-info" key={e}>
                {e}
              </span>
            );
          })}
        </span>
      );
    } else {
      return <span className="tag badge badge-pill badge-info">None</span>;
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
}

export default BugListItem;
