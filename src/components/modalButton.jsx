import React, { Component } from "react";

const ModalButton = props => {
  return (
    <button
      type="button"
      className={`btn ${props.className}`}
      data-toggle="modal"
      data-target={`#${props.target}`}
    >
      {props.children}
    </button>
  );
};

export default ModalButton;
