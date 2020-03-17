import React, { Component, useState } from "react";
import Global from "../../global.js";
import PendingInvitationListItem from "./pendingInvitationListItem";
class PendingInvitationList extends Component {
  state = { invitations: null };
  render() {
    const { invitations } = this.state;
    return (
      <React.Fragment>
        {invitations && invitations.length >= 0 && (
          <div>
            <div>
              <h3>
                <u>Pending Invitations</u>
              </h3>
            </div>
            <div>{this.renderInvitations()}</div>
          </div>
        )}
      </React.Fragment>
    );
  }
  componentDidMount() {
    this.getInvitations();
  }
  getInvitations() {
    const url = Global.gatewayUrl("prjt/invite/sentInvitations");
    const body = {
      project_id: this.props.id
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, data => {
      console.log(data);
      this.setState({
        invitations: data.sent_invitations
      });
    });
  }
  renderInvitations() {
    const { invitations } = this.state;
    if (!invitations) {
      return <div></div>;
    }
    if (invitations.length === 0) {
      return <h5 className="text-center my-5">No pending invitations</h5>;
    }
    return (
      <div>
        {invitations.map(e => {
          return (
            <PendingInvitationListItem
              key={e.invited}
              invitation={e}
              onDelete={this.handleInvitationDelete.bind(this)}
            />
          );
        })}
      </div>
    );
  }
  handleInvitationDelete(invitation) {
    let invitations = [...this.state.invitations];
    let url = Global.gatewayUrl("prjt/invite/resolve");
    url = Global.addQuery(url, { accepted: false });
    const body = {
      username: invitation.invited,
      project_id: this.props.id
    };
    const options = Global.options({}, body, "POST");
    console.log(url);
    console.log(options);
    Global.fetch(url, options, () => {
      invitations.splice(this.state.invitations.indexOf(invitation), 1);
      this.setState({ invitations });
    });
  }
}

export default PendingInvitationList;
