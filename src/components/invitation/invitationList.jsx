import React, { Component } from "react";
import InvitationListItem from "./invitationListItem";
import Global from "../../global.js";
class InvitationList extends Component {
  state = {
    invitations: []
  };
  render() {
    return (
      <div>
        <div className="mx-auto">{this.renderInvitations()}</div>
      </div>
    );
  }
  componentDidMount() {
    this.getInvitations();
  }

  getInvitations() {
    const url = Global.gatewayUrl("prjt/invite/getAll");
    const options = Global.options({}, null, "GET");
    Global.fetch(url, options, data => {
      this.setState({ invitations: data.invitations });
    });
  }
  removeInvitation(invitation) {
    let invitations = [...this.state.invitations];
    invitations.splice(this.state.invitations.indexOf(invitation), 1);
    this.setState({ invitations });
  }
  renderInvitations() {
    const { onResolve } = this.props;
    if (this.state.invitations.length <= 0) {
      return <h1 className="text-center my-5">No Invitations Yet</h1>;
    }
    return (
      <React.Fragment>
        {this.state.invitations.map(e => {
          return (
            <InvitationListItem
              onResolve={(accepted, invitation) => {
                this.removeInvitation(invitation);
                onResolve(accepted, invitation);
              }}
              key={e.project_id}
              invitation={e}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default InvitationList;
