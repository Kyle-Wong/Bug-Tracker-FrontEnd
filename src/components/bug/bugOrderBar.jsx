import React, { Component } from "react";

class BugOrderBar extends Component {
  state = {};
  render() {
    const { order, direction, onClick } = this.props;
    return (
      <div className="order-bar d-flex">
        <div
          className="col-md-1 clickable"
          onClick={() => {
            onClick("title");
          }}
        >
          <span>
            Bug&nbsp;
            {order === "title" && (
              <i
                className={
                  direction === "desc" ? "fas fa-caret-up" : "fas fa-caret-down"
                }
              ></i>
            )}
          </span>
        </div>
        <div className="col-md-2 ml-auto">Created By</div>
        <div
          className="col-md-2 clickable"
          onClick={() => {
            onClick("create_time");
          }}
        >
          <span>
            Create Time&nbsp;
            {order === "create_time" && (
              <i
                className={
                  direction === "asc" ? "fas fa-caret-up" : "fas fa-caret-down"
                }
              ></i>
            )}{" "}
          </span>
        </div>
        <div className="col-sm-1"></div>
        <div
          className="col-sm-2 clickable"
          onClick={() => {
            onClick("priority");
          }}
        >
          <span>
            Priority&nbsp;
            {order === "priority" && (
              <i
                className={
                  direction === "asc" ? "fas fa-caret-up" : "fas fa-caret-down"
                }
              ></i>
            )}{" "}
          </span>
        </div>
        <div className="col-sm-1">Resolved</div>
      </div>
    );
  }
}

export default BugOrderBar;
