import React, { Component } from "react";
import BugAddTag from "./bugAddTag";
import Global from "../../global";

import "../../css/bugModal.css";

class BugAddModal extends Component {
  state = {
    title: "",
    body: "",
    tagInput: "",
    priority: 0,
    tags: []
  };
  render() {
    const { onSubmit } = this.props;
    const { title, body, tagInput, priority } = this.state;
    return (
      <div
        className="modal"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Create New Bug
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.clearState.bind(this)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="my-3">
                <label htmlFor="exampleFormControlSelect1">Bug Title</label>
                <div>
                  <input
                    className="form"
                    value={title}
                    onChange={this.handleTitleChange.bind(this)}
                  ></input>
                </div>
              </div>
              <div className="my-3">
                <label htmlFor="exampleFormControlSelect1">
                  Bug Description
                </label>

                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={body}
                  onChange={this.handleBodyChange.bind(this)}
                ></textarea>
              </div>

              <div className="row my-3">
                <div className="col-md-auto">
                  <label htmlFor="tagInput">Tags:&nbsp;</label>
                  <input
                    id="tagInput"
                    className="form"
                    value={tagInput}
                    onChange={this.handleTagInputChange.bind(this)}
                    list="tags"
                    name="tags"
                    autoComplete="off"
                    onKeyDown={e => {
                      if (e.keyCode === 13) this.handleTagAdd();
                    }}
                  ></input>
                  {this.tagList()}
                  <button onClick={this.handleTagAdd.bind(this)}>Add</button>
                </div>
                {this.renderTags()}
              </div>
              <div>
                <label htmlFor="priority">Priority Level:&nbsp;</label>
                <select
                  id="priority"
                  onChange={this.handlePriorityChange.bind(this)}
                  value={priority}
                >
                  <option value="0">Highest</option>
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                  <option value="4">Lowest</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.clearState.bind(this)}
              >
                Close
              </button>
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-primary"
                id="submitButton"
                onClick={() => {
                  onSubmit(this.state);
                  this.clearState();
                }}
              >
                Add Bug
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    document.getElementById("submitButton").disabled =
      this.state.title.length === 0;
  }
  clearState() {
    document.getElementById("submitButton").disabled = true;

    this.setState({ title: "", body: "", priority: 0, tagInput: "", tags: [] });
  }
  handleTitleChange(e) {
    document.getElementById("submitButton").disabled =
      e.target.value.length === 0;
    this.setState({ title: e.target.value });
  }
  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }
  handleTagInputChange(e) {
    this.setState({ tagInput: e.target.value });
  }
  handlePriorityChange(e) {
    this.setState({ priority: parseInt(e.target.value) });
  }
  handleTagAdd() {
    const { tags, tagInput } = this.state;
    if (tagInput.length === 0) return;

    if (!tags.includes(tagInput)) {
      tags.push(tagInput);
    }
    this.setState({ tagInput: "" });
  }
  handleTagRemove(tag) {
    let newTags = [...this.state.tags];
    newTags.splice(newTags.indexOf(tag), 1);
    this.setState({ tags: newTags });
  }
  renderTags() {
    const { tags } = this.state;
    return (
      <div className="col my-auto">
        {tags.map(e => {
          return (
            <BugAddTag key={e} onClick={this.handleTagRemove.bind(this)}>
              {e}
            </BugAddTag>
          );
        })}
      </div>
    );
  }
  tagList() {
    let { uniqueTags } = this.props;
    if (!uniqueTags || uniqueTags.length === 0)
      return (
        <datalist id="tags">
          <option value="" />
        </datalist>
      );
    return (
      <datalist id="tags">
        {uniqueTags.map(e => {
          return <option key={e} value={e} />;
        })}
      </datalist>
    );
  }
}

export default BugAddModal;
