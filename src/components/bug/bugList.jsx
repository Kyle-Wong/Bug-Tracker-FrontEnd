import React, { Component } from "react";
import Global from "../../global";
import BugListItem from "./bugListItem";
import BugOrderBar from "./bugOrderBar";
import BugSearchBar from "./bugSearchBar";
import "../../css/bugList.css";
const QueryString = require("querystring");

class BugList extends Component {
  order = { title: "title", create_time: "create_time", priority: "priority" };
  direction = { asc: "asc", desc: "desc" };
  state = {
    bugs: [],
    search: "",
    page: 0,
    order: "",
    direction: "",
    includeResolved: false,
    project_id: parseInt(this.props.id),
    uniqueTags: []
  };
  render() {
    const { uniqueTags, includeResolved } = this.state;
    return (
      <div className="mx-auto bug-list">
        <BugSearchBar
          uniqueTags={uniqueTags}
          includeResolved={includeResolved}
          onCheck={this.handleCheckEvent.bind(this)}
          onSearch={this.handleSearch.bind(this)}
        />
        <hr />
        <BugOrderBar
          order={this.state.order}
          direction={this.state.direction}
          onClick={this.orderButton.bind(this)}
        />
        {this.renderBugs()}
      </div>
    );
  }
  componentDidMount() {
    let queryString = window.location.search.slice(1);
    const {
      search,
      page,
      order,
      direction,
      includeResolved
    } = QueryString.parse(queryString);
    this.setState({
      search,
      page,
      order,
      direction,
      includeResolved: includeResolved === "true"
    });
    this.bugSearch(
      search,
      page,
      order,
      direction,
      includeResolved === "true",
      parseInt(this.props.id),
      []
    );
  }
  orderButton(type) {
    let { order, direction } = this.state;
    const { title } = this.order;
    const { asc, desc } = this.direction;
    if (type === order) {
      //if same type if clicked, invert sort direction
      direction = direction === asc ? desc : asc;
    } else {
      order = type;
      //alphabetical title order = ascending, others are descending
      direction = order === title ? asc : desc;
    }
    this.setState({ order, direction }, () => {
      this.refreshSearch();
    });
  }
  refreshSearch(state = this.state) {
    const { search, page, order, direction, includeResolved } = state;
    const options = {
      search,
      page,
      order,
      direction,
      includeResolved
    };
    const url = Global.baseUrl(2) + "?" + QueryString.stringify(options);
    window.location.href = url;
  }
  bugSearch(search, page, order, direction, includeResolved, project_id) {
    let url = Global.gatewayUrl("prjt/bug/get");
    if (typeof includeResolved === "string") {
      includeResolved = includeResolved === "true";
    }
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
      project_id
    };
    const options = Global.options({}, body, "POST");
    console.log(url);
    console.log(options);
    Global.fetch(url, options, res => {
      console.log(res);
      this.setState({ bugs: res.bugs, uniqueTags: this.uniqueTags(res.bugs) });
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
  uniqueTags(bugs) {
    if (!bugs || bugs.length === 0) return [];
    let tagSet = new Set();
    for (let i = 0; i < bugs.length; i++) {
      bugs[i].tag_names.map(e => {
        tagSet.add(e);
      });
    }
    return Array.from(tagSet);
  }
  handleCheckEvent(e) {
    const { includeResolved } = this.state;
    this.setState({ includeResolved: !includeResolved });
  }
  handleSearch(searchString) {
    const { page, order, direction, includeResolved } = this.state;
    this.bugSearch(
      searchString,
      page,
      order,
      direction,
      includeResolved,
      parseInt(this.props.id)
    );
  }
}

export default BugList;
