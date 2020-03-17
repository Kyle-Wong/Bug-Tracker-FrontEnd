import React, { useState } from "react";

const PermissionListItem = props => {
  const { username, project_id, access_level } = props.permission;
  const { onSubmit } = props;
  const [selectedAccess, setSelectedAccess] = useState(access_level);
  const renderButton = () => {
    if (parseInt(selectedAccess) === access_level) {
      //case no changes have been made. disable the button
      return (
        <button type="button" className="btn btn-outline-primary" disabled>
          Save Changes
        </button>
      );
    }
    if (parseInt(selectedAccess) === 3) {
      //user wants to remove person from project
      return (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => {
            onSubmit(
              username,
              project_id,
              parseInt(selectedAccess),
              props.permission
            );
          }}
        >
          Remove from project
        </button>
      );
    } else {
      //changes have been made, button is active
      return (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            onSubmit(
              username,
              project_id,
              parseInt(selectedAccess),
              props.permission
            );
          }}
        >
          Save Changes
        </button>
      );
    }
  };
  return (
    <div className="project-list-item card my-3 border border-dark">
      <div className="card-header">
        <div className="container-fluid row ">
          <div className="col col-sm-3">
            <a className="project-header">{username}</a>
          </div>
          <div className="col-sm-3 align-self-center">
            <select
              value={selectedAccess}
              onChange={e => {
                setSelectedAccess(e.target.value);
              }}
            >
              <option value="1">Edit</option>
              <option value="2">View Only</option>
              <option value="3">None</option>
            </select>
          </div>
          <div className="ml-auto ">{renderButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default PermissionListItem;
