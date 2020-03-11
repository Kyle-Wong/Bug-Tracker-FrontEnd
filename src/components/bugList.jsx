import React, { Component } from "react";
import Global from "../global";
import BugListItem from "./bugListItem";
const QueryString = require("querystring");

class BugList extends Component {
  order = { title: "title", create_time: "create_time", priority: "priority" };
  direction = { asc: "asc", desc: "desc" };
  state = {
    bugs: []
  };
  render() {
    return (
      <div>
        <div>
          <h1>Bug List</h1>
        </div>
        {this.renderBugs()}
      </div>
    );
  }
  componentDidMount() {
    this.bugSearch(
      "",
      0,
      this.order.create_time,
      this.direction.desc,
      false,
      parseInt(this.props.id),
      []
    );
  }
  bugSearch(
    search,
    page,
    order,
    direction,
    includeResolved,
    project_id,
    tags_filter
  ) {
    let url = Global.gatewayUrl("prjt/bug/get");
    let query =
      "?" +
      QueryString.stringify({
        search,
        page,
        order,
        direction,
        includeResolved
      });
    url = query.length <= 1 ? url : url + query;
    const body = {
      project_id,
      tags_filter
    };
    const options = Global.options({}, body, "POST");
    console.log(url);
    console.log(options);
    Global.fetch(url, options, res => {
      console.log(res);
      this.setState({ bugs: res.bugs });
    });
  }

  renderBugs() {
    const { bugs } = this.state;
    if (bugs.length !== 0) {
      return (
        <div>
          {bugs.map(e => {
            return <BugListItem bug={e} key={e.bug_id} />;
          })}
        </div>
      );
    } else {
      return <h1 className="text-center">This project has no bugs.</h1>;
    }
  }
}

export default BugList;
