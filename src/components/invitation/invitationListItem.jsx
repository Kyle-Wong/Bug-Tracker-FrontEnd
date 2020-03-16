import React, { Component } from "react";

const InvitationListItem = props => {
  const {
    project_id,
    project_name,
    root_user,
    access_level
  } = props.invitation;
  const { onResolve } = props;
  return (
    <React.Fragment>
      <div className="project-list-item card my-5 border border-dark">
        <div className="card-header">
          <div className="container-fluid row ">
            <div className="col-sm-3">
              <span className="project-header">{project_name}</span>
            </div>

            <div className="ml-auto mr-3">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  onResolve(true, props.invitation);
                }}
              >
                Accept
              </button>
            </div>
            <div className="">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  onResolve(false, props.invitation);
                }}
              >
                Decline
              </button>
            </div>
          </div>
          <div className="container-fluid row ">
            <div className="ml-3 mr-3 align-self-center">
              Created by: {root_user}
            </div>
            <div className=" ml-auto  align-self-center">
              Permissions: can{" "}
              <b>{access_level <= 1 ? "edit, view" : "view"}</b>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InvitationListItem;
