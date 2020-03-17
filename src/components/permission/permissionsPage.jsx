import React, { Component } from "react";
import InviteUserInput from "./inviteUserInput";
import PermissionList from "./permissionList";
import PendingInvitationList from "./pendingInvitationList";
import BugNavBar from "../bug/bugNavBar";
import Global from "../../global.js";
class PermissionsPage extends Component {
  state = {
    projectID: -1,
    inviteErrorMessage: "",
    inviteSuccessMessage: ""
  };
  render() {
    const { inviteErrorMessage, inviteSuccessMessage } = this.state;
    const projectID = parseInt(this.props.match.params.projectID);
    return (
      <div>
        <div className="w3-blue w3-center" style={{ padding: "50px 16px" }}>
          {" "}
          <h1 className="text-center">Manage Permissions</h1>
        </div>
        <BugNavBar
          defaultSelected="permissions"
          onBugClick={this.goToBugsPage.bind(this)}
          onPermissionClick={() => {}}
        />
        <div
          className="mx-auto"
          style={{ maxWidth: "650px", marginBottom: "150px" }}
        >
          <InviteUserInput
            successMessage={inviteSuccessMessage}
            errorMessage={inviteErrorMessage}
            onSubmit={this.inviteUser.bind(this)}
          />
          <PendingInvitationList id={projectID} />
          <h3>
            <u>Manage Project Access</u>
          </h3>
          <PermissionList id={projectID} />
        </div>
      </div>
    );
  }
  componentDidMount() {
    const { projectID } = this.props.match.params;
    Global.getAccessLevel(parseInt(projectID), data => {
      if (data.access_level !== 0)
        window.location.href = "insufficientcredentials";
    });
  }
  inviteUser(username, access_level) {
    const { projectID } = this.props.match.params;

    const url = Global.gatewayUrl("prjt/invite/send");
    const body = {
      invited: username,
      access_level,
      project_id: parseInt(projectID)
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(
      url,
      options,
      data => {
        console.log(data);
        this.setState({
          inviteSuccessMessage: `Invitation sent to ${username}`,
          inviteErrorMessage: ""
        });
      },
      data => {
        console.log(data);
        this.handleInviteError(username, data);
      }
    );
  }
  handleInviteError(username, data) {
    switch (data.code) {
      case 405:
        this.setState({
          inviteSuccessMessage: "",
          inviteErrorMessage: `User '${username}' could not be found`
        });
        break;
      case 413:
        this.setState({
          inviteSuccessMessage: "",
          inviteErrorMessage: `User '${username}' already has access to the project. User permissions can be edited below.`
        });
        break;
      case 421:
        this.setState({
          inviteSuccessMessage: "",
          inviteErrorMessage: `User '${username}' has already been sent an invitation.`
        });
        break;
      default:
        Global.error(data);
    }
  }
  goToBugsPage() {
    window.location.href =
      "/projects/" +
      this.props.match.params.projectID +
      "?search=&page=0&order=title&direction=asc&includeResolved=false";
  }
}

export default PermissionsPage;
