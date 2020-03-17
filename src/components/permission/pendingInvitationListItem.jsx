import React, { useState } from "react";

const PendingInvitationListItem = props => {
  const { invited, project_id, access_level } = props.invitation;
  const { onDelete } = props;
  const renderAccessLevel = () => {
    if (access_level === 1) {
      return "Edit";
    } else if (access_level === 2) {
      return "View Only";
    }
  };
  return (
    <div className="project-list-item card my-3 border border-dark">
      <div className="card-header">
        <div className="container-fluid row ">
          <div className="col col-sm-3">
            <a className="project-header">{invited}</a>
          </div>
          <div className="col-sm-3 align-self-center">
            {renderAccessLevel()}
          </div>
          <div className="ml-auto ">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                onDelete(props.invitation);
              }}
            >
              Cancel Invitation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingInvitationListItem;
