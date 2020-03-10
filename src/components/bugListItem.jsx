import React, { Component } from "react";
import Global from "../global";
class BugListItem extends Component {
  state = {};
  render() {
    const { bug } = this.props;
    return (
      <React.Fragment>
        <div className="card d-flex mb-4">
          <div className="card-header">{bug.title}</div>
          <div className="card-body p-10">{bug.body}</div>
          <div>
            Posted by {bug.created_by} on{" "}
            {Global.convertToDate(bug.create_time)}
          </div>
          <div>Bug Status: {this.resolved()}</div>
        </div>
      </React.Fragment>
    );
  }
  resolved() {
    return this.props.resolved === 1 ? "Resolved" : "Unresolved";
  }
}

export default BugListItem;
