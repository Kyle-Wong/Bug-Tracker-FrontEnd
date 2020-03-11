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
        <div className="card">
          <div
            className="card-header d-flex"
            data-toggle="collapse"
            data-target={"#" + bodyID}
          >
            <div className="col-sm-4">{bug.title}</div>
            <div className="ml-auto col-sm-3">
              {Global.convertToDate(bug.create_time)}
            </div>
            <div className="col-sm-1">{bug.priority}</div>
          </div>
          <div className=" collapse" id={bodyID}>
            <div className="card-body p-10">
              {bug.body}
              Posted by {bug.created_by} on{" "}
              {Global.convertToDate(bug.create_time)}
            </div>
            <div>Bug Status: {this.resolved()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  resolved() {
    return this.props.resolved === 1 ? "Resolved" : "Unresolved";
  }
}

export default BugListItem;
