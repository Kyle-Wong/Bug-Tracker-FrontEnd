import React, { Component } from "react";
import Global from "../../global.js";
import InvitationList from "./invitationList";
import InvitationModal from "./invitationModal";
class InvitationsPage extends Component {
  state = {
    modalShow: false,
    invitation: {}
  };
  render() {
    return (
      <div>
        <InvitationModal
          show={this.state.modalShow}
          onClose={this.handleModalClose.bind(this)}
          onSubmit={this.goToProject.bind(this)}
          invitation={this.state.invitation}
        />
        <div className="w3-blue w3-center" style={{ padding: "50px 16px" }}>
          {" "}
          <h1 className="text-center">Invitation Inbox</h1>
        </div>
        <div
          className="mx-auto"
          style={{ maxWidth: "600px", marginBottom: "150px" }}
        >
          <InvitationList onResolve={this.handleInvitationResolve.bind(this)} />
        </div>
      </div>
    );
  }
  handleModalOpen(invitation) {
    this.setState({ modalShow: true, invitation });
  }
  handleModalClose() {
    this.setState({ modalShow: false });
  }
  handleInvitationResolve(accepted, invitation) {
    this.resolveInvitation(accepted, invitation.project_id);

    if (accepted) {
      this.handleModalOpen(invitation);
    }
  }
  resolveInvitation(accepted, project_id) {
    let url = Global.gatewayUrl("prjt/invite/resolve");
    url = Global.addQuery(url, { accepted });
    const username = Global.getSession().username;
    const body = {
      username,
      project_id
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, () => {});
  }
  goToProject(invitation) {
    window.location.href =
      "/projects/" +
      invitation.project_id +
      "?search=&page=0&order=title&direction=asc&includeResolved=false";
  }
}

export default InvitationsPage;
