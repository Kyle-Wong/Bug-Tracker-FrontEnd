import React, { Component } from "react";

class BugsPage extends Component {
  state = {};
  render() {
    return <h1>Project #{this.props.match.params.projectID}</h1>;
  }
}

export default BugsPage;
