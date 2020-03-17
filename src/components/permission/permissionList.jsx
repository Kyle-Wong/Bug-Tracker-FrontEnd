import React, { Component, useState } from "react";
import Global from "../../global.js";
import PermissionListItem from "./permissionListItem";
class PermissionList extends Component {
  state = { permissions: null };
  render() {
    return <div>{this.renderPermissions()}</div>;
  }
  componentDidMount() {
    this.getPermissions();
  }
  getPermissions() {
    const projectID = this.props.id;
    const url = Global.gatewayUrl("prjt/project/permissions");
    const username = Global.getSession().username;
    const body = {
      project_id: projectID
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, data => {
      //return all permissions except the current user
      this.setState({
        permissions: data.permissions.filter(e => {
          return e.username !== username;
        })
      });
    });
  }
  renderPermissions() {
    const { permissions } = this.state;
    if (!permissions) {
      return <div></div>;
    }
    if (permissions.length === 0) {
      return <h1 className="text-center my-5">No users yet</h1>;
    }
    return (
      <div>
        {permissions.map(e => {
          return (
            <PermissionListItem
              key={e.username}
              permission={e}
              onSubmit={this.handlePermissionEdit.bind(this)}
            />
          );
        })}
      </div>
    );
  }
  handlePermissionEdit(username, project_id, newAccessLevel, permission) {
    let permissions = [this.state.permissions];
    const url = Global.gatewayUrl("prjt/project/setAccess");
    const body = {
      username,
      project_id,
      access_level: newAccessLevel
    };
    const options = Global.options({}, body, "POST");
    console.log(url);
    console.log(options);

    Global.fetch(url, options, () => {
      if (newAccessLevel === 3) {
        permissions.splice(this.state.permissions.indexOf(permission), 1);
        this.setState({ permissions }, () => {
          window.location.reload();
        });
      } else {
        window.location.reload();
      }
    });
  }
}

export default PermissionList;
