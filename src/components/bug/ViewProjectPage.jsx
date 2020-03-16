import React, { Component } from "react";
import Global from "../../global";
import BugList from "./bugList";
class ViewProjectPage extends Component {
  state = {
    project: {}
  };
  render() {
    const { projectID } = this.props.match.params;
    const { project_name } = this.state.project;
    return (
      <div style={{ marginBottom: "150px" }}>
        <div className="w3-blue w3-center" style={{ padding: "50px 16px" }}>
          {" "}
          <h1 className="text-center">{project_name}</h1>
        </div>
        <BugList id={projectID} />
      </div>
    );
  }
  componentDidMount() {
    this.getMetadata();
  }
  getMetadata() {
    const url = Global.gatewayUrl(
      `prjt/project/get/${this.props.match.params.projectID}`
    );
    const options = Global.options({}, null, "GET");
    Global.fetch(url, options, res => {
      console.log(res);
      if (res.project.length > 0) this.setState({ project: res.project[0] });
    });
  }
}

export default ViewProjectPage;
