import React, { Component } from "react";
import Global from "../../global";
import BugList from "./bugList";
import BugNavBar from "./bugNavBar";
class ViewProjectPage extends Component {
  state = {
    project: {},
    accessLevel: 3,
  };
  render() {
    const { projectID } = this.props.match.params;
    const { project_name } = this.state.project;
    const { accessLevel } = this.state;
    return (
      <div style={{ marginBottom: "150px" }}>
        <div
          className="w3-blue w3-center"
          style={{ padding: "50px 0px", height: "142px", position: "relative" }}
        >
          {" "}
          <h1 className="text-center">{project_name}</h1>
          {accessLevel <= 0 && (
            <BugNavBar
              defaultSelected="bugs"
              onBugClick={() => {}}
              onPermissionClick={this.goToPermissionsPage.bind(this)}
            />
          )}
        </div>

        <BugList accessLevel={accessLevel} id={projectID} />
      </div>
    );
  }
  componentDidMount() {
    this.getMetadata();
    this.getAccessLevel();
  }

  getMetadata() {
    const url = Global.gatewayUrl(
      `prjt/project/get/${this.props.match.params.projectID}`
    );
    const options = Global.options({}, null, "GET");
    Global.fetch(url, options, (res) => {
      console.log(res);
      if (res.project.length > 0) this.setState({ project: res.project[0] });
    });
  }
  getAccessLevel() {
    const { projectID } = this.props.match.params;
    const url = Global.gatewayUrl("prjt/project/accessLevel");

    const body = {
      project_id: parseInt(projectID),
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, (data) => {
      console.log(data);
      this.setState({ accessLevel: data.access_level });
    });
  }
  goToPermissionsPage() {
    const { projectID } = this.props.match.params;
    window.location.href = Global.pageUrl(`projects/${projectID}/permissions`);
  }
}

export default ViewProjectPage;
