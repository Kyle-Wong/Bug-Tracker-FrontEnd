import React, { Component } from "react";
import Global from "../../global";
import BugListItem from "./bugListItem";
import BugOrderBar from "./bugOrderBar";
import BugSearchBar from "./bugSearchBar";
import BugAddModal from "./bugAddModal";
import BugEditModal from "./bugEditModal";
import "../../css/bugList.css";
const QueryString = require("querystring");

class BugList extends Component {
  order = { title: "title", create_time: "create_time", priority: "priority" };
  direction = { asc: "asc", desc: "desc" };
  addModalId = "add-modal";
  editModalId = "edit-modal";
  state = {
    bugs: [],
    search: "",
    page: 0,
    order: "",
    direction: "",
    includeResolved: false,
    project_id: parseInt(this.props.id),
    uniqueTags: [],
    editModal: { show: false }
  };
  render() {
    const { uniqueTags, includeResolved, editModal } = this.state;
    return (
      <div className="mx-auto bug-list">
        <BugAddModal
          id={this.addModalId}
          uniqueTags={uniqueTags}
          onSubmit={this.handleBugAdd.bind(this)}
        />
        <BugEditModal
          uniqueTags={uniqueTags}
          onSubmit={this.handleBugEdit.bind(this)}
          modal={editModal}
          closeModal={this.closeEditModal.bind(this)}
        />
        <BugSearchBar
          uniqueTags={uniqueTags}
          includeResolved={includeResolved}
          onCheck={this.handleCheckEvent.bind(this)}
          onSearch={this.handleSearch.bind(this)}
          modalId={this.addModalId}
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
            return (
              <BugListItem
                showModal={this.openEditModal.bind(this)}
                onResolve={this.handleBugResolve.bind(this)}
                onDelete={this.handleBugDelete.bind(this)}
                bug={e}
                key={e.bug_id}
              />
            );
          })}
        </div>
      );
    } else {
      return <h1 className="text-center"></h1>;
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
    console.log(!includeResolved);
    this.setState({ includeResolved: !includeResolved });
  }
  handleSearch(searchString) {
    const { page, order, direction, includeResolved } = this.state;
    const newState = {
      search: searchString,
      page,
      order,
      direction,
      includeResolved
    };
    this.setState(newState, () => {
      this.refreshSearch();
    });
  }
  handleBugResolve(bug_id, resolved) {
    const project_id = parseInt(this.props.id);
    const url = Global.gatewayUrl("/prjt/bug/resolve");
    const body = {
      project_id,
      bug_id,
      resolved
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, data => {
      console.log(data);
      window.location.reload();
    });
  }
  handleBugDelete(bug_id) {
    const project_id = parseInt(this.props.id);
    const url = Global.gatewayUrl("/prjt/bug/delete");
    const body = {
      project_id,
      bug_id
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, data => {
      console.log(data);
      window.location.reload();
    });
  }
  handleBugAdd(modalState) {
    const { title, body, priority, tags } = modalState;
    const project_id = parseInt(this.props.id);
    console.log(`${title}, ${body}, ${priority}, ${tags}`);
    const url = Global.gatewayUrl("/prjt/bug/add");
    const sendBody = {
      project_id,
      title,
      body,
      priority,
      tags
    };
    const options = Global.options({}, sendBody, "POST");
    Global.fetch(url, options, data => {
      console.log(data);
      window.location.reload();
    });
  }
  handleBugEdit(modalState) {
    const { bug_id, title, body, priority, tags } = modalState;
    const project_id = parseInt(this.props.id);
    console.log(`${bug_id}, ${title}, ${body}, ${priority}, ${tags}`);

    const url = Global.gatewayUrl("/prjt/bug/edit");
    const sendBody = {
      project_id,
      bug_id,
      title,
      body,
      priority,
      tags
    };
    const options = Global.options({}, sendBody, "POST");
    Global.fetch(url, options, data => {
      console.log(data);
      window.location.reload();
    });
  }
  openEditModal(bugState) {
    console.log(bugState);
    const state = {
      bug_id: bugState.bug_id,
      title: bugState.title,
      body: bugState.body,
      priority: bugState.priority,
      tags: bugState.tag_names,
      show: true
    };
    this.setState({ editModal: state });
  }
  closeEditModal() {
    const copy = { ...this.state.editModal };
    copy.show = false;
    this.setState({ editModal: copy });
  }
}

export default BugList;
