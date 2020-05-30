import React from "react";
import "../../css/bugNavBar.css";
const BugNavBar = props => {
  const { defaultSelected, onBugClick, onPermissionClick } = props;
  console.log(defaultSelected);
  const navItem = active => {
    if (active == defaultSelected) {
      return "bug-nav-item-active unselectable";
    } else {
      return "bug-nav-item unselectable";
    }
  };
  return (
    <div className="w3-blue row justify-content-md-center bug-navbar">
      <span className=" col col-sm-1 py-2 mb-0 text-right">
        <span onClick={onBugClick} className={navItem("bugs")}>
          Bug List
        </span>
      </span>
      <span className="  col col-sm-1 py-2 mb-0 draw-right-border">
        <span onClick={onPermissionClick} className={navItem("permissions")}>
          Permissions
        </span>
      </span>
    </div>
  );
};

export default BugNavBar;
