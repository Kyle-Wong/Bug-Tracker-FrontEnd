import React, { useState } from "react";

const InviteUserInput = props => {
  const [user, setUser] = useState("");
  const [accessLevel, setAccess] = useState(1);
  const { onSubmit, errorMessage, successMessage } = props;
  const handleUsernameChange = e => {
    setUser(e.target.value);
  };
  const handleAccessLevelChange = e => {
    setAccess(parseInt(e.target.value));
  };
  return (
    <div className="mx-auto my-3" style={{ maxWidth: "400px" }}>
      {errorMessage.length > 0 && (
        <div className="alert alert-danger border border-danger rounded">
          {errorMessage}
        </div>
      )}
      {successMessage.length > 0 && (
        <div className="alert alert-primary border border-primary rounded">
          {successMessage}
        </div>
      )}
      <div className="project border border-dark rounded ">
        <div>
          <h3 htmlFor="exampleFormControlTextarea1">Add User to Project</h3>
        </div>
        <div className="row">
          <div className="col col-sm-auto">
            <label htmlFor="exampleFormControlSelect1">Username:&nbsp;</label>
            <span>
              <input className="form" onChange={handleUsernameChange}></input>
            </span>
          </div>
          <div className="col d-flex align-items-end">
            <div>
              <label htmlFor="accessLevel">User can:&nbsp;</label>
              <select id="accessLevel" onChange={handleAccessLevelChange}>
                <option value="1">Edit</option>
                <option value="2">View Only</option>
              </select>
            </div>
          </div>
        </div>
        <button
          className="d-flex mx-auto btn-outline-primary my-1"
          onClick={() => {
            onSubmit(user, accessLevel);
          }}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default InviteUserInput;
