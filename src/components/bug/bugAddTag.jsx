import React from "react";
import "../../css/tag.css";
const BugAddTag = props => {
  return (
    <React.Fragment>
      <div className="badge badge-pill badge-primary tag">
        <span
          onClick={() => {
            props.onClick(props.children);
          }}
          className="tag-button  unselectable"
        >
          &times;
        </span>
        <span className="tag-text">{props.children}</span>
      </div>
    </React.Fragment>
  );
};

export default BugAddTag;
